/* ====================================================================
   drive-sync.js — HMG CBT Pro Google Drive Cloud Backup & Auto-Sync
   ====================================================================
   Purpose: give platform owners PERMANENT ownership of their data with
   zero-server, 100% FREE automated and 1-click cloud backup and restore.
   Uses Google Identity Services (GIS) token model and Google Drive REST
   API v3. Scope: drive.file — the app can ONLY see files it created
   itself; it can never read the rest of the school's Drive.

   ONE-TIME SETUP PER PLATFORM (see DEPLOYMENT.md):
     1. console.cloud.google.com → create OAuth Client ID (Web application)
     2. Add the platform's deployed URL(s) to "Authorized JavaScript origins"
     3. Paste the Client ID into Settings → Google Drive Cloud Sync
     4. Click "Authorize Drive" once on any admin device and sign in.

   AUTO-SYNC (honest free-tier semantics): browsers cannot run when closed
   and the free stack has no server, so "automatic" means: whenever ANY
   admin opens any admin page, DriveSync checks whether the configured
   interval (default 7 days) has elapsed since the last successful backup
   and, if so, silently creates the next one. With normal weekly admin use
   this is fully automatic; the GitHub/UptimeRobot heartbeats protect the
   DATABASE separately.

   FIX HISTORY:
   • v4.0 (Phase 2): loadCfg/saveCfg previously required a `window.sb`
     Supabase SDK client that never exists in this pure-fetch codebase —
     Drive settings were silently never loaded or saved. They now use
     plain fetch() against the platform_settings table + the
     save_platform_settings() RPC, with the institutions row as fallback.
   • v4.0: getToken() now registers error_callback — closing the Google
     popup previously left the promise pending FOREVER. It also maps
     Google's error types to human-readable instructions.
   • v4.0: 401 responses trigger exactly one silent re-authentication
     before surfacing an error (tokens expire after ~1 hour).
   • v4.0: uploads are recorded in system_backups via log_backup_event()
     so every platform admin sees the full backup history.
   ==================================================================== */
const DriveSync = {
  SCOPE: 'https://www.googleapis.com/auth/drive.file',
  LS_KEY: 'hmg-cbt-drive-sync',
  MAX_KEEP: 15,                 // newest backups kept in Drive; older auto-trimmed
  FOLDER_NAME: 'HMG_CBT_Backups',
  token: null,
  tokenExp: 0,
  _tokenClient: null,
  _gisLoading: null,
  _authPromise: null,
  cfg: {
    clientId: '',
    enabled: false,
    days: 7,
    folderId: '',
    lastBackup: null
  },

  state() {
    try { return JSON.parse(localStorage.getItem(this.LS_KEY) || '{}'); } catch (_) { return {}; }
  },
  setState(patch) {
    try { localStorage.setItem(this.LS_KEY, JSON.stringify(Object.assign(this.state(), patch))); } catch (_) {}
  },

  /* ── Settings persistence (pure fetch — platform_settings first,
        institutions row as fallback for older deployments) ── */
  async loadCfg() {
    const App = window.App;
    if (!App || !App.SB_URL || !App.SB_KEY) return this.cfg;
    const headers = { 'apikey': App.SB_KEY, 'Authorization': `Bearer ${App.SB_KEY}` };
    try {
      // platform_settings (new canonical home — shared by every admin device)
      const r = await fetch(`${App.SB_URL}/rest/v1/platform_settings?id=eq.1&select=drive_client_id,drive_sync_enabled,drive_sync_days,drive_folder_id,drive_last_backup`, { headers });
      if (r.ok) {
        const rows = await r.json();
        if (rows && rows.length) {
          const d = rows[0];
          this.cfg = {
            clientId: d.drive_client_id || '',
            enabled: !!d.drive_sync_enabled,
            days: Math.max(1, Number(d.drive_sync_days) || 7),
            folderId: d.drive_folder_id || '',
            lastBackup: d.drive_last_backup || null
          };
          return this.cfg;
        }
      }
      // legacy fallback: institutions row
      const r2 = await fetch(`${App.SB_URL}/rest/v1/institutions?select=drive_client_id,drive_sync_enabled,drive_sync_days,drive_folder_id,drive_last_backup&limit=1`, { headers });
      if (r2.ok) {
        const rows2 = await r2.json();
        if (rows2 && rows2.length) {
          const d = rows2[0];
          this.cfg = {
            clientId: d.drive_client_id || '',
            enabled: !!d.drive_sync_enabled,
            days: Math.max(1, Number(d.drive_sync_days) || 7),
            folderId: d.drive_folder_id || '',
            lastBackup: d.drive_last_backup || null
          };
        }
      }
    } catch (e) {
      console.warn('[DriveSync] settings load skipped:', e.message || e);
    }
    return this.cfg;
  },

  async saveCfg(patch) {
    Object.assign(this.cfg, patch || {});
    const App = window.App;
    if (!App || !App.SB_URL) return this.cfg;
    const payload = {
      drive_client_id: this.cfg.clientId,
      drive_sync_enabled: this.cfg.enabled,
      drive_sync_days: this.cfg.days,
      drive_folder_id: this.cfg.folderId
    };
    if (this.cfg.lastBackup) payload.drive_last_backup = this.cfg.lastBackup;
    try {
      // Admin RPC (merges the patch, audit-logged server-side)
      await App.sbRpc('save_platform_settings', { p_patch: payload });
    } catch (e) {
      // Older schema without the RPC → fall back to direct institutions update
      try {
        const rows = await App.sbFetch('/rest/v1/institutions?select=id&limit=1');
        if (rows && rows.length) {
          await App.sbFetch(`/rest/v1/institutions?id=eq.${rows[0].id}`, 'PATCH', payload);
        }
      } catch (e2) {
        console.warn('[DriveSync] settings could not be saved to the database (saved locally only):', e2.message || e2);
      }
    }
    return this.cfg;
  },

  isConfigured() {
    return !!(this.cfg.clientId && this.cfg.clientId.trim().length > 10);
  },

  /* ── Google Identity Services ── */
  async loadGIS() {
    if (window.google?.accounts?.oauth2) return true;
    if (this._gisLoading) return this._gisLoading;
    this._gisLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(true);
      s.onerror = () => { this._gisLoading = null; reject(new Error('Failed to load Google Identity Services SDK — check your internet connection.')); };
      document.head.appendChild(s);
    });
    return this._gisLoading;
  },

  /* Human-readable mapping for Google's OAuth error types. */
  _friendlyAuthError(err) {
    const type = err && err.type;
    if (type === 'popup_closed') return 'The Google sign-in window was closed before finishing. Click Authorize again and complete the sign-in.';
    if (type === 'popup_failed_to_open') return 'The browser blocked the Google sign-in popup. Allow popups for this site and try again.';
    if (type === 'access_denied') return 'Drive access was declined. The backup needs the "drive.file" permission (it can only see files it creates).';
    return (err && err.message) || 'Google authorization failed.';
  },

  async getToken(prompt = false) {
    if (this.token && Date.now() < this.tokenExp - 60000) return this.token;
    if (!this.isConfigured()) throw new Error('Google Drive Client ID is not configured. Add it in Settings → Google Drive Cloud Sync.');
    await this.loadGIS();

    if (this._authPromise) return this._authPromise;

    this._authPromise = new Promise((resolve, reject) => {
      let settled = false;
      const done = (fn, arg) => { if (!settled) { settled = true; this._authPromise = null; fn(arg); } };
      try {
        this._tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this.cfg.clientId.trim(),
          scope: this.SCOPE,
          callback: (resp) => {
            if (resp.error) return done(reject, new Error(resp.error_description || resp.error));
            this.token = resp.access_token;
            this.tokenExp = Date.now() + (Number(resp.expires_in) || 3500) * 1000;
            this.setState({ granted: true, lastAuth: Date.now(), email: resp.session_state ? this.state().email : '' });
            done(resolve, this.token);
          },
          error_callback: (err) => done(reject, new Error(this._friendlyAuthError(err)))
        });
        this._tokenClient.requestAccessToken({ prompt: prompt ? 'consent' : '' });
        // Safety net: never leave the caller hanging longer than 5 minutes
        setTimeout(() => done(reject, new Error('Google authorization timed out — please try again.')), 5 * 60 * 1000);
      } catch (err) {
        done(reject, err);
      }
    });
    return this._authPromise;
  },

  /* Drive REST helper with a single silent retry on 401 (token expiry). */
  async api(path, opts = {}) {
    const run = async (tok) => fetch(`https://www.googleapis.com${path}`, {
      ...opts,
      headers: { Authorization: `Bearer ${tok}`, ...(opts.headers || {}) }
    });
    let tok = await this.getToken(false);
    let res = await run(tok);
    if (res.status === 401) {
      // token expired mid-session → force a fresh one exactly once
      this.token = null; this.tokenExp = 0;
      tok = await this.getToken(false);
      res = await run(tok);
    }
    return res;
  },

  /* ── Backup folder (verified: reused if it still exists, recreated if
        it was trashed or deleted — previously a trashed folder id made
        every upload fail silently forever) ── */
  async ensureFolder(token) {
    token = token || await this.getToken(false);
    // 1. Verify the configured folder still exists and is not trashed
    if (this.cfg.folderId) {
      try {
        const r = await this.api(`/drive/v3/files/${this.cfg.folderId}?fields=id,trashed,name`);
        if (r.ok) {
          const f = await r.json();
          if (!f.trashed) return this.cfg.folderId;
        }
      } catch (_) { /* fall through to search */ }
    }
    // 2. Search for an existing folder (any previous device's folder)
    const q = encodeURIComponent(`name = '${this.FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
    const listRes = await this.api(`/drive/v3/files?q=${q}&spaces=drive&fields=files(id,name)`);
    if (listRes.ok) {
      const listData = await listRes.json();
      if (listData.files && listData.files.length > 0) {
        this.cfg.folderId = listData.files[0].id;
        await this.saveCfg({ folderId: this.cfg.folderId });
        return this.cfg.folderId;
      }
    }
    // 3. Create a fresh folder
    const createRes = await this.api('/drive/v3/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' })
    });
    if (!createRes.ok) throw new Error('Could not create the backup folder in Google Drive.');
    const createData = await createRes.json();
    this.cfg.folderId = createData.id;
    await this.saveCfg({ folderId: this.cfg.folderId });
    return this.cfg.folderId;
  },

  /* ── Upload a backup envelope and record it in system_backups ── */
  async uploadBackup(envelope, customFilename) {
    const token = await this.getToken(false);
    const folderId = await this.ensureFolder(token);
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = customFilename || `HMG_CBT_Backup_${ts}.json`;
    const jsonStr = typeof envelope === 'string' ? envelope : JSON.stringify(envelope, null, 2);

    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelim = `\r\n--${boundary}--`;

    const metadata = {
      name: filename,
      parents: [folderId],
      mimeType: 'application/json',
      description: 'HMG Academy CBT Pro Portable Cloud Backup'
    };

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      jsonStr +
      closeDelim;

    const res = await this.api('/upload/drive/v3/files?uploadType=multipart&fields=id,name,size,webViewLink', {
      method: 'POST',
      headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
      body: multipartRequestBody
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Google Drive upload failed (${res.status})`);
    }

    const file = await res.json();
    this.cfg.lastBackup = new Date().toISOString();
    await this.saveCfg({ lastBackup: this.cfg.lastBackup });

    // Record the backup in the platform's history (admins see it in Admin Data)
    const totalRecords = (envelope && envelope.summary && envelope.summary.total_records) || 0;
    try {
      await window.App.sbRpc('log_backup_event', {
        p_backup_name: filename,
        p_provider: 'google_drive',
        p_drive_file_id: file.id || '',
        p_drive_file_url: file.webViewLink || '',
        p_file_size_bytes: Number(file.size || jsonStr.length || 0),
        p_total_records: Number(totalRecords),
        p_metadata: { auto: !customFilename && !window.__driveManualBackup }
      });
    } catch (_) { /* older schema — history is best-effort */ }

    // Auto-trim: keep only the newest MAX_KEEP backups (awaited, not fire-and-forget)
    await this.pruneOldBackups(token, folderId).catch(() => {});

    return file;
  },

  async listBackups() {
    const token = await this.getToken(false);
    const folderId = await this.ensureFolder(token);
    const q = encodeURIComponent(`'${folderId}' in parents and trashed = false and mimeType = 'application/json'`);
    const res = await this.api(`/drive/v3/files?q=${q}&orderBy=createdTime desc&pageSize=50&fields=files(id,name,size,createdTime,webViewLink)`);
    if (!res.ok) throw new Error('Could not list Google Drive backups.');
    const data = await res.json();
    return data.files || [];
  },

  async downloadBackup(fileId) {
    const res = await this.api(`/drive/v3/files/${fileId}?alt=media`);
    if (!res.ok) throw new Error('Failed to download the backup from Google Drive.');
    return await res.json();
  },

  async deleteBackup(fileId) {
    const res = await this.api(`/drive/v3/files/${fileId}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error(`Could not delete the Drive backup (${res.status}).`);
    return true;
  },

  async pruneOldBackups(token, folderId) {
    token = token || await this.getToken(false);
    folderId = folderId || await this.ensureFolder(token);
    const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const res = await this.api(`/drive/v3/files?q=${q}&orderBy=createdTime desc&fields=files(id,name,createdTime)`);
    if (!res.ok) return;
    const data = await res.json();
    const files = data.files || [];
    if (files.length > this.MAX_KEEP) {
      const toDelete = files.slice(this.MAX_KEEP);
      for (const f of toDelete) {
        await this.api(`/drive/v3/files/${f.id}`, { method: 'DELETE' }).catch(() => {});
      }
    }
  },

  /* Test whether the current origin is authorized for the configured
     Client ID (fast pre-flight before showing the Authorize button). */
  async testConnection() {
    const token = await this.getToken(false);
    const res = await this.api('/drive/v3/about?fields=user,storageQuota');
    if (!res.ok) throw new Error('Google Drive connection test failed.');
    const about = await res.json();
    this.setState({ email: about.user?.emailAddress || '' });
    return about;
  },

  /* ── Auto-sync (honest semantics, see header) ── */
  async checkAutoSync(envelopeProvider) {
    await this.loadCfg();
    if (!this.cfg.enabled || !this.isConfigured()) return { ran: false, reason: 'disabled' };
    const last = this.cfg.lastBackup ? new Date(this.cfg.lastBackup).getTime() : 0;
    const intervalMs = this.cfg.days * 24 * 60 * 60 * 1000;
    if (Date.now() - last >= intervalMs) {
      console.log('[DriveSync] Auto-backup is due. Creating background snapshot…');
      try {
        const envelope = typeof envelopeProvider === 'function' ? await envelopeProvider() : null;
        if (envelope) {
          await this.uploadBackup(envelope);
          console.log('[DriveSync] Auto-backup successfully synced to Google Drive.');
          return { ran: true, at: this.cfg.lastBackup };
        }
      } catch (e) {
        console.warn('[DriveSync] Auto-sync attempt deferred:', e.message);
        return { ran: false, reason: e.message };
      }
    }
    return { ran: false, reason: 'not-due' };
  },

  /* Is an automatic backup due right now? (UI hint on the settings page) */
  isDue() {
    if (!this.cfg.enabled || !this.isConfigured()) return false;
    const last = this.cfg.lastBackup ? new Date(this.cfg.lastBackup).getTime() : 0;
    return Date.now() - last >= this.cfg.days * 24 * 60 * 60 * 1000;
  }
};

window.DriveSync = DriveSync;
