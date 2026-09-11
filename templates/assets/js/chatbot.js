/* ====================================================================
   chatbot.js — HMG CBT Pro v4.1 Rule-Based Interactive Assistant
   ====================================================================
   100% Offline, Zero AI API, Free-Tier Rule-Based Knowledge Assistant.
   45+ intents covering EVERY page and feature: exams, CSV compatibility,
   calculator, maths keyboard, manual review, disaster recovery, Drive
   sync, free-tier protection, licensing, generator, accessibility,
   certificates, audit, storage, settings, roles… plus quick-question
   chips for first-time users and page-aware answers.
   ==================================================================== */
const CBTChatbot = {
  isOpen: false,
  messages: [
    { sender: 'bot', text: 'Hello! 👋 I am your **CBT System Assistant** — I know every page of this platform.\n\nTry the quick questions below, or ask me anything: creating exams, CSV formats, the scientific calculator, essay grading, Google Drive backup, Supabase protection, disaster recovery, licensing…' }
  ],

  kb: [
    /* ── EXAM CREATION ── */
    { keywords: ['create exam', 'make exam', 'new exam', 'create assessment', 'build exam'], reply: '**To create an assessment (Teacher Hub):**\n1. Choose an input method — **CSV Upload**, **Type Questions** (all 20 types with live previews), **XLSX/PDF**, or **Reuse a previous exam**\n2. Fill the settings: duration, attempts, passmark, negative marking, result release, anti-cheat switches\n3. **Publish** → you get a 6-character code + a WhatsApp-ready share message\n\nTip: CSVs from **School Connect / GOSA Portal import unchanged** — the format is auto-detected.' },
    { keywords: ['csv format', 'csv columns', 'question template', 'download template', 'csv order'], reply: '**CSV formats this platform understands (auto-detected):**\n\n1️⃣ **HMG 17-column:** `Question,A,B,C,D,CorrectAnswer,Explanation,Type,Tolerance,Unit,Accept,MRQ_AON,Pairs,Items,Difficulty,Tags,Section` — columns 8–17 optional\n2️⃣ **School Connect / GOSA:** `question,type,a,b,c,d,answer,explanation,mark,difficulty,topic,tolerance,section` — any column order works\n3️⃣ **Headerless:** 14+ columns = HMG layout; fewer = School Connect layout\n\nDownload the template from Teacher Hub → CSV panel, or ask me about **type names**.' },
    { keywords: ['school connect csv', 'gosa csv', 'import from school connect', 'cross platform', 'compatible'], reply: '**Yes — full cross-platform CSV compatibility:**\n\n• School Connect / GOSA CSVs import into this platform **unchanged** (their headers, aliases, and type names like `true_false`, `multi_select`, `fill_blank` are auto-translated)\n• Your banks export to their format: Teacher Hub → Bank → **🔀 Export School Connect CSV**\n• Full-text answers are converted to A–D letters automatically\n\nSee Teacher Hub → CSV panel for details.' },
    { keywords: ['question types', 'types of questions', '17 types', '20 types', 'cloze', 'matching', 'matrix', 'hot text'], reply: '**All 20 question types:** MCQ · Multiple Response (all-or-nothing option) · True/False · Short Answer · Numeric (± tolerance) · Range/Estimation (any value in an interval) · Matching (with distractors) · Ordering · Assertion–Reason · Case Study/Comprehension · Image MCQ · Matrix/Grid · Hot Text · Code · Cloze multi-blank · Essay (keyword + min-word marking) · Categorization · Multi-part Numeric · Hotspot (tap the image) · Evidence-Based MCQ (two-part).\n\nFull reference with copy-paste CSV examples for every type: **question-types.html** (also linked from the Create Assessment page). Every type has a live preview in the Teacher Hub manual builder, and structured types take JSON in the Pairs/Items columns.' },
    { keywords: ['multi subject', 'utme', 'jamb', 'combined exam', 'subject tabs'], reply: '**Multi-Subject packages (cbt-multi.html):** bundle 4+ subjects under ONE code with ONE combined timer. Candidates switch subject tabs freely — answers persist per subject. Results include a per-subject breakdown (e.g. English 82% · Maths 64%).' },
    { keywords: ['negative marking', 'penalty'], reply: '**Negative marking:** set the penalty per wrong answer when creating the exam (e.g. 0.25). Unanswered questions are never penalised — only wrong ones. It appears in the exam settings and applies at grading.' },
    { keywords: ['access code', 'exam code', '6 character', 'share exam', 'share link'], reply: '**Access codes:** every published exam gets a unique 6-character code + link. Candidates enter it on the home page (or follow the link). The Teacher Hub shows a WhatsApp-ready message. Codes can be regenerated, exams locked/unlocked, duplicated or archived.' },

    /* ── TAKING EXAMS ── */
    { keywords: ['take exam', 'start exam', 'student portal', 'candidate', 'enter code'], reply: '**Taking an exam:** open the link or home page → enter the 6-character code → type your name and class (or registered Student ID) → pass the identity/proctoring gate if enabled → the exam runs in fullscreen with a timer and question navigator.\n\nYour answers auto-save to the device every 10 seconds, and a draft restore brings you back if the browser crashes.' },
    { keywords: ['calculator', 'scientific calculator', 'alt+c', 'trigonometry', 'logb'], reply: '**The on-screen scientific calculator** (exam screen, Alt+C):\n• Trig + reciprocals + inverses (sin…cot, asin…acot) with DEG/RAD\n• Hyperbolics + inverses, ln/log/log₂/logb(x,b), powers, roots, nCr/nPr, n!\n• **Statistics:** median, mode, std, variance, range, count\n• Percent handled like a real calculator (50% = 0.5, but 10 % 3 = modulo)\n• Memory MC/MR/M+/M−/MS, **Ans**, constants (π, e, τ, φ, g, Nₐ…)\n• **↑ ↓ replay** of your last 20 expressions and **⤵ Use result** which types the answer straight into your answer box\n• Safe tokenising engine — no eval, ever' },
    { keywords: ['maths keyboard', 'math keyboard', 'symbols', 'greek', 'integral symbol', 'alt+k'], reply: '**The Maths & Science keyboard** (exam screen, Alt+K): **300+ searchable symbols** in 20 groups — all 48 Greek letters, calculus (∫∬∭∮∂∇∑), sets & logic, number sets, geometry, vectors & matrices, statistics, brackets, fractions, relations, chemistry (H₂O, SO₄²⁻, ⇌), physics units, arrows, super/subscripts.\n\nTap your answer box first, then tap a symbol. Use the 🔎 search box to find any symbol by name ("integral", "alpha", "subset").' },
    { keywords: ['cheating', 'anti cheat', 'proctoring', 'webcam', 'tab switch', 'fullscreen'], reply: '**Integrity system:** fullscreen lockdown, tab-switch and window-blur detection, copy/paste/right-click/devtools blocking, optional webcam Face Gate with periodic snapshots and multi-face detection, optional voice-activity monitor. Violations warn, log, and can auto-submit at the configured limit.\n\nThe calculator and maths keyboard are recognised exam tools — using them never raises a flag.' },
    { keywords: ['draft', 'autosave', 'browser crashed', 'restore answers', 'offline'], reply: '**Answer safety nets:** answers auto-save to the device every 10 seconds. If the browser or network dies, reopening the exam offers a **draft restore** back to your exact question. An offline backup file can be downloaded mid-exam if the network is gone.' },
    { keywords: ['result', 'score', 'grade ring', 'released', 'held'], reply: '**Results:** after submitting you see the score ring, grade, time used, integrity summary and a question-by-question breakdown with explanations. Teachers can hold results for manual release. If your script contains **essay/code/short answers**, a 🧑‍🏫 notice explains those marks stay provisional until the teacher\'s audit.' },

    /* ── MANUAL REVIEW ── */
    { keywords: ['essay grading', 'essay mark', 'essays marked', 'how are essays', 'manual grading', 'tutor audit', 'review queue', 'subjective', 'override score', 'keyword score'], reply: '**Tutor Score Audit (manual review):** scripts containing essay / code / short-answer / case-study questions are **auto-flagged** into the teacher\'s 🧑‍⚖️ **Review Queue** at submission.\n\nOpen a script → the marking-scheme panel shows expected keywords, minimum words and the provisional keyword score → **✏️ Audit** each open-ended question → assign 0.0–1.0, add feedback, optionally release the result. When every open-ended question is audited, the script leaves the queue and the revision is written to the audit trail.' },

    /* ── AI PROMPTS ── */
    { keywords: ['ai prompt', 'chatgpt', 'claude', 'gemini', 'deepseek', 'prompt studio', 'generate questions'], reply: '**AI Prompts Studio (cbt-prompts.html):** 24 tailored prompt packs (simple recall → enterprise all-20-types → 🎯 Auto-Graded Ultimate Pack (every auto-marked type) → multi-subject UTME → misconception hunter → exam-board simulation → uploaded/linked material CBT → reading & video comprehension → assignment brief + rubric…). Copy the prompt into any **free** AI chat, paste the answer back, and the validator checks it before loading into your Teacher Hub bank.\n\nNo AI API, no cost — and the 17-column CSV contract is enforced in the prompt itself.' },

    /* ── GENERATOR ── */
    { keywords: ['generator', 'whitelabel', 'custom zip', 'brand', 'new school', 'client package'], reply: '**The CBT System Generator is a separate product** (cbtgen.vercel.app) — it is not part of this exam platform. Deployments for client schools are built there: brand the identity and theme, inject the client\'s Supabase credentials and license, and download a verified, deploy-ready ZIP of a complete CBT system.' },

    /* ── BACKUP / DRIVE / DR ── */
    { keywords: ['google drive', 'drive sync', 'cloud backup', 'backup', 'sync'], reply: '**Google Drive backup:** Settings → Google Drive Cloud Sync → paste a free OAuth Client ID → **Authorize** → **Test** → **Backup Now**, then enable auto-sync (interval in days). Backups land in the school\'s OWN Drive folder `HMG_CBT_Backups` (newest 15 kept, scope drive.file — we only see our own files). Full setup guide: **GOOGLE_DRIVE_BACKUP.md**.' },
    { keywords: ['disaster recovery', 'inactive project', 'paused project', 'lost project', 'new supabase', 'migrate', 'restore drive'], reply: '**Disaster Recovery Console (🚨 Recovery page):** if a Supabase project is lost/paused forever but the school has Drive backups, the 7-step console rebuilds everything on a fresh free project:\n\n1. Connect the previous Google Drive (or load a downloaded envelope file)\n2. Create the new project + run the schema SQL — connection & schema TESTED live\n3. Choose a backup and inspect its contents\n4. **Dry-run** the restore (full plan, nothing written)\n5. Execute + live verification (row counts vs envelope)\n6. Switch permanently + re-invite staff logins\n7. Re-arm the 10-layer protection\n\nIdempotent throughout — interrupted? Just re-run.' },
    { keywords: ['envelope', 'full backup', 'export data', 'data portability'], reply: '**Backup envelopes (Admin Data):** one JSON file with every table — exams with banks, rosters, results, settings, license, recent audit. Restore supports **dry-run** (see the exact plan first), upserts exams by code, students by (teacher, ID), and re-attaches results by exam code. Legacy v10 envelopes auto-convert.' },

    /* ── FREE-TIER PROTECTION ── */
    { keywords: ['free tier', 'supabase pause', 'inactivity', 'keepalive', 'heartbeat', 'pause', '7 day'], reply: '**10-layer Supabase free-tier protection** (Supabase pauses free projects after 7 days without database activity):\n\n0. Heartbeat table + RPC · 1. site-visit pings · 2. GitHub Actions twice-weekly (verified write + self-committing anti-freeze) · 3. Vercel endpoint · 4. pg_cron every 2 days · 5. manual button · 6. UptimeRobot 24/7 · 7. Vercel cron · 8. Supabase Edge function `ping` · 9+10. daily Management-API **auto-restore watchdog**.\n\nEvery layer performs a REAL database write and the timestamp proof is checked. Full manual: **SUPABASE_FREE_TIER_PROTECTION.md** (~7 min setup).' },

    /* ── STORAGE ── */
    { keywords: ['storage', '500mb', 'quota', 'archive vault', 'purge', 'database size'], reply: '**Storage Manager (storage.html):** real Postgres table sizes vs the 500 MB free cap, an efficiency advisor, and the **Archive Vault** — old results/audit rows are snapshotted into the separate 1 GB File Storage bucket, the upload is verified, and ONLY THEN can the purge run (the purge RPC demands the archive path as proof). Restore any archive later.' },

    /* ── HEALTH / SECURITY ── */
    { keywords: ['platform health', 'health page', 'health check', 'security grade', 'rls', 'posture', 'diagnostics'], reply: '**Platform Health (platform-health.html):** latency probe, 7 RPC smoke tests, live heartbeat evidence, and an **A–F security posture grade** — anon-key hygiene, RLS probes that must FAIL anonymously, HTTPS, session hygiene, lockdown/idle-lock config. Anything below B comes with the exact fix, and the report is copyable for support.' },

    /* ── GOVERNANCE ── */
    { keywords: ['roles', 'status', 'approve', 'suspend', 'user management', 'super admin', 'approval queue'], reply: '**Roles & Status (status-manager.html):** approval queue for new sign-ups, teacher/admin/super_admin roles (owner-only grants enforced server-side), bulk activate/suspend/deactivate with reasons, account drill-downs (exams, submissions, audit trail) and an invite-message generator. The FIRST registered account becomes super_admin automatically.' },
    { keywords: ['audit', 'activity log', 'who did', 'event log', 'trail'], reply: '**Audit & Activity Log (activity_log.html):** every privileged action — approvals, role changes, purges, archives, restores, settings edits, license changes, score audits — with server-side filtering, stats, a 30-day chart, live tail, CSV export and retention purge (with a downloadable copy first).' },
    { keywords: ['license', 'subscription', 'expiry', 'grace', 'lifetime', 'token'], reply: '**Site License (license.html) — dual engine:**\n• **Subscription lifecycle:** lifetime/active/warning (≤30 days)/grace/expired/suspended; remote registry → database row → baked config; SHA-256 tamper evidence; quick-extend +30/+90/+365 days\n• **Offline perpetual token:** the HMAC-SHA256 certificate, verifiable with zero network\n\nThe lock screen never interrupts an in-progress exam.' },
    { keywords: ['settings', 'branding', 'passmark default', 'accessibility', 'lockdown', 'idle'], reply: '**Settings (settings.html) — 12 sections:** institution branding (live preview), assessment defaults, accessibility (font scale, contrast, motion, dyslexia font, 5 languages), security (idle sign-out, audit retention, emergency Lockdown Mode), module access matrix per role, official signature canvas, exam watermark, Google Drive config, and a live Supabase connection test.' },

    /* ── CERTIFICATES / VERIFY ── */
    { keywords: ['certificate', 'verify', 'verification code', 'qr'], reply: '**Certificates:** passed exams issue certificates with a verification code + QR link. Anyone can verify on certificate.html (no login). Held results issue nothing until the teacher releases them. The proprietor\'s signature from Settings appears on printouts.' },

    /* ── PWA / INSTALL ── */
    { keywords: ['install', 'install app', 'pwa', 'add to home', 'home screen', 'download app'], reply: '**Installing the app** (recommended for exams): the banner at the bottom of every page offers it.\n• **Android/Chrome/Edge:** Install app (or menu ⋮ → Add to Home screen)\n• **iPhone/iPad:** open in **Safari** → Share ⬆️ → **Add to Home Screen**\n• **Windows/Mac/Chromebook:** install icon in the address bar\n\nInstalled, it runs full-screen, loads faster and survives weak networks. The weekly reminder stops once installed.' },

    /* ── ACCOUNTS ── */
    { keywords: ['sign up', 'register', 'login', 'account', 'teacher account', 'approved'], reply: '**Accounts:** sign up with email + password (Supabase Auth). Teachers/admins wait in the **approval queue** until an admin approves them — the first account on a fresh platform becomes super_admin automatically. Candidates never need accounts: they use the exam code + their name (or registered Student ID).' },
    { keywords: ['student id', 'registered student', 'roster', 'impersonation'], reply: '**Registered vs Open candidates:** teachers import a roster (FullName, StudentID, Class). A registered exam only admits students whose ID is on the roster — stopping impersonation. Open exams accept any name + class.' },

    /* ── DATA / SCHEMA ── */
    { keywords: ['schema', 'sql', 'complete_schema', 'database setup', 'tables'], reply: '**Database setup:** one file — `database/complete-schema.sql` — installs 10 tables, 40+ RPCs, security policies, the archive-vault bucket, the heartbeat system and starter rows. **Idempotent:** safe to run many times; running it on an older deployment upgrades it in place without data loss.' },
    { keywords: ['rls security', 'is my data safe', 'security', 'anon key', 'service role'], reply: '**Security model:** row-level security decides per request who may read/write what — enforced by Postgres, not by the browser. The public anon key is safe in the page; the **service_role key must NEVER be pasted anywhere** (Platform Health grades this instantly as F). All destructive actions are owner-only, batch-capped, whitelist-checked and audit-logged.' },

    /* ── HELP / NAVIGATION ── */
    { keywords: ['where is', 'navigate', 'which page', 'how do i find', 'menu'], reply: '**Every page:** 🏠 Home (launcher) · 📝 Take Exam · 👨‍🏫 Teacher Hub · 🧪 Multi-Subject Builder · 🤖 AI Prompts · ⚙️ Generator · 🛡️ Admin · 💾 Data & Sync · 🚨 Recovery · 📦 Storage · 🩺 Health · 👥 Roles · ⚙️ Settings · 📜 License · 📊 Audit · 🏅 Verify.\n\nThe **📘 Help Center** button on any page guide explains every section of the current page in detail.' },
    { keywords: ['help center', 'page guide', 'guide banner', 'explain page'], reply: 'Click **📘 Help Center** in the page guide banner (top of every page) for: getting-started paths per role (candidate/teacher/admin/owner), a detailed description of **every page and section**, an 18-term glossary, and FAQs. The bot (me) answers questions about all of it too.' },
    { keywords: ['first time', 'getting started', 'beginner', 'new user', 'start here'], reply: '**First time here?**\n• **Candidates:** get the 6-character code from your teacher → home page → Take Exam\n• **Teachers:** sign up → get approved → Teacher Hub → Create Assessment (a School Connect CSV pastes straight in)\n• **Admins:** Settings → branding/defaults/security, then approve staff, then connect Google Drive\n• **Owners:** Generator → 4 steps → deploy the branded ZIP\n\nAsk me about any of these for the detailed walkthrough.' },
    { keywords: ['price', 'cost', 'paid', 'free', 'subscription fee'], reply: '**Everything here is free:** hosting (Vercel/GitHub Pages), database (Supabase free tier + 10-layer protection), backups (the school\'s own Google Drive), question generation (free AI chats + our prompt packs), certificates, PWA — no per-student cost, no AI API.' }
  ],

  quickQuestions: ['How do I create an exam?', 'CSV format help', 'Calculator features', 'How are essays graded?', 'Google Drive backup setup', 'Explain free-tier protection', 'Disaster recovery steps', 'How do I install the app?'],

  init() {
    this.injectWidget();
  },

  injectWidget() {
    if (document.getElementById('cbt-chatbot-widget')) return;
    const widget = document.createElement('div');
    widget.id = 'cbt-chatbot-widget';
    const esc = t => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    widget.innerHTML = `
      <div id="cbt-chatbot-toggle" onclick="CBTChatbot.toggle()" style="position:fixed;bottom:24px;left:24px;z-index:99990;background:linear-gradient(135deg,var(--primary),var(--accent));color:#000;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.4);transition:transform 0.2s;" title="Ask the CBT Assistant">
        🤖
      </div>
      <div id="cbt-chatbot-window" style="position:fixed;bottom:86px;left:24px;z-index:99990;width:370px;max-width:calc(100vw - 48px);height:520px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:0 16px 48px rgba(0,0,0,0.5);display:none;flex-direction:column;overflow:hidden;">
        <div style="background:var(--surface-2);padding:14px 16px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:20px;">🤖</span>
            <div>
              <strong style="font-size:13px;display:block;">CBT System Assistant</strong>
              <small style="font-size:11px;color:var(--primary);">Offline knowledge bot · knows every page</small>
            </div>
          </div>
          <button class="btn btn-sm btn-outline" onclick="CBTChatbot.toggle(false)" style="padding:4px 8px;">✕</button>
        </div>
        <div id="cbt-chatbot-quick" style="padding:8px 10px;border-bottom:1px solid var(--border);display:flex;flex-wrap:wrap;gap:5px;background:var(--bg);">
          ${this.quickQuestions.map(q => `<button class="btn btn-sm btn-outline" style="padding:4px 9px;font-size:11px;margin:0;" onclick="CBTChatbot.ask('${esc(q).replace(/'/g, "\\'")}')">${esc(q)}</button>`).join('')}
        </div>
        <div id="cbt-chatbot-messages" style="flex:1;padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;font-size:13px;"></div>
        <div style="padding:10px;background:var(--surface-2);border-top:1px solid var(--border);display:flex;gap:6px;">
          <input type="text" id="cbt-chatbot-input" placeholder="Ask anything — pages, exams, backup, recovery…" style="margin-bottom:0;padding:8px 12px;font-size:13px;" onkeydown="if(event.key==='Enter') CBTChatbot.send()">
          <button class="btn btn-sm btn-primary" onclick="CBTChatbot.send()">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
    this.render();
  },

  toggle(force) {
    this.isOpen = force !== undefined ? force : !this.isOpen;
    const win = document.getElementById('cbt-chatbot-window');
    if (win) win.style.display = this.isOpen ? 'flex' : 'none';
    if (this.isOpen) setTimeout(() => document.getElementById('cbt-chatbot-input')?.focus(), 100);
  },

  ask(q) {
    this.toggle(true);
    const inp = document.getElementById('cbt-chatbot-input');
    if (inp) { inp.value = q; }
    this.send();
  },

  /* score-based matching: the intent with most (and longest) keyword hits wins */
  _match(lower) {
    let best = null, bestScore = 0;
    for (const item of this.kb) {
      let score = 0;
      for (const k of item.keywords) {
        if (lower.includes(k)) score += k.length;   // longer match = stronger signal
      }
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return best;
  },

  send() {
    const inp = document.getElementById('cbt-chatbot-input');
    const text = inp?.value.trim();
    if (!text) return;

    this.messages.push({ sender: 'user', text });
    inp.value = '';
    this.render();

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = null;

      if (/\b(hello|hi|hey|good (morning|afternoon|evening))\b/.test(lower) && lower.length < 30) {
        reply = 'Hello! 👋 Ask me about **any page or feature** — creating exams, CSV formats, the calculator, essay grading, Drive backup, free-tier protection, disaster recovery, licensing, installing the app… or tap a quick question above.';
      } else if (lower.includes('thank')) {
        reply = 'You are very welcome! 🎉 Ask me anything else any time.';
      } else {
        const hit = this._match(lower);
        if (hit) reply = hit.reply;
      }

      if (!reply) {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        reply = `I don't have a specific answer for that yet. Try asking about: **create exam**, **CSV format**, **calculator**, **essay grading**, **Google Drive**, **free-tier protection**, **disaster recovery**, **roles**, **license**, or **installing the app**.\n\nFor a full walkthrough of this page (${page}) tap **📘 Help Center** in the page guide banner at the top.`;
      }

      this.messages.push({ sender: 'bot', text: reply });
      this.render();
    }, 250);
  },

  render() {
    const container = document.getElementById('cbt-chatbot-messages');
    if (!container) return;
    container.innerHTML = this.messages.map(m => `
      <div style="align-self:${m.sender === 'user' ? 'flex-end' : 'flex-start'};max-width:88%;background:${m.sender === 'user' ? 'var(--primary)' : 'var(--surface-2)'};color:${m.sender === 'user' ? '#000' : 'var(--text)'};padding:10px 14px;border-radius:12px;border:1px solid ${m.sender === 'user' ? 'transparent' : 'var(--border)'};line-height:1.55;">
        ${m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code style="background:rgba(127,127,127,.15);padding:1px 5px;border-radius:5px;font-size:11.5px;">$1</code>').replace(/\n/g, '<br>')}
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }
};

window.CBTChatbot = CBTChatbot;

document.addEventListener('DOMContentLoaded', () => {
  if (window.SiteHelp && !document.getElementById('cbt-page-guide-banner')) SiteHelp.renderPageGuideBanner();
  CBTChatbot.init();
});
