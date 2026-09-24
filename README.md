# ⚙️ CBT System Generator — Whitelabel Platform Builder

> **This is the GENERATOR product** — a separate deployment that *builds* complete,
> branded CBT platforms for client schools. It is **not** the exam platform itself:
> it has no student portal, no teacher login and no admin console. Deploy it as its
> own site (e.g. `cbtgen.vercel.app`), separate from any CBT system it produces.

## What this is

| | |
|---|---|
| **Product** | CBT System Generator |
| **Purpose** | Brand, configure and package a complete CBT exam platform for a client in 4 steps, entirely in the browser |
| **Output** | A verified, deploy-ready ZIP of 75+ files — the standalone client CBT system (see `templates/`) |
| **Cost model** | Free tools only. No AI API, no build step, no server-side code |
| **Live example** | https://cbtgen.vercel.app |

## Pages

| File | What it is |
|---|---|
| `index.html` | Product landing page — what the generator does, how it works, what's in the generated ZIP. No portals, no logins. |
| `generator.html` | The 4-step wizard: Brand & Identity → Theme & Typography → Backend & License → Preview & Download |
| `assets/js/generator.js` | The engine: branding transforms, theme/font/layout application, licence baking, ZIP packaging and post-build verification |
| `templates/` | The complete client CBT system that gets branded and packaged — **the generator never appears in a generated package, and the generated package never contains the generator** |

## The 4-step workflow

1. **🎨 Brand & Identity** — client school name, tagline, support contacts, default passmark.
2. **🖌️ Theme & Typography** — 50 professional themes (or custom colours), 50 professional font stacks, 50 layouts.
3. **🔌 Backend & License** — the client's Supabase URL + anon key (tested live) and their licence: lifetime or subscription (cycle, expiry, grace days).
4. **👁️ Preview & Download** — live preview, then the engine fetches every file from `templates/`, brands it, builds the ZIP, **re-opens it and verifies every expected file** before download, and writes a client-specific `START-HERE.md`.

## What the generated client package contains

The full CBT system (exactly the contents of `templates/`): the 3-portal homepage
(candidate / teacher login / admin login — internal tools live behind the staff
logins), 20 pages (incl. the dedicated question-types.html reference), multi-subject UTME mode, AI Prompts Studio (24 packs + full
copy-paste library, no AI API), proctoring & anti-cheat, governance suite
(backups, Drive sync, disaster recovery, storage, health, roles, audit),
verifiable certificates, 1,000-student submission resilience, the Phase 10
enterprise pack (adaptive difficulty, instant-feedback practice mode with
points & streaks, ExamSoft-style psychometric report, per-candidate extra-time
accommodations, UTME /400 aggregate scoring, live invigilation monitor, result
appeals, hideable leaderboard, integrity signals — all rule-based, no AI API;
see `templates/PHASE10_ENTERPRISE_FEATURES.md`), the Phase 10B exam-reachability
hotfix (open-by-default publish reset, persistent "database out of date" banner
for teachers, actionable student messages when the database lags the site, and
a live schema probe in the deployment validator; see
`templates/PHASE10B_EXAM_REACHABILITY_HOTFIX.md`), the Phase 11 wiring audit
(role-aware cross-page sessions so tool pages always see the signed-in teacher,
complete navigation panes listing every page, and 📄 Paper Exam Export —
print-ready question paper + confidential answer key + OMR bubble sheet from
any exam; see `templates/PHASE11_WIRING_AND_COMPLIANCE_AUDIT.md`), and a
`database/` folder whose `complete-schema.sql` is the single, all-inclusive,
idempotent, run-once setup file. See `templates/README.md` for the platform's
own documentation.

## Full-stack & SaaS architecture

Every generated platform is FULL-STACK on 100% free tiers: PWA front-end on a
CDN + Supabase Auth (roles/approvals) + Postgres with row-level security +
45 server-side RPCs + Storage vault + GitHub Actions heartbeat + Edge
Function. SaaS primitives ship built in: multi-role tenancy, subscription
licensing with a remote registry, audit trails, and a Client Monitor for the
builder. Scaling model: a **SaaS factory** — one generator run = one branded,
isolated, licensed client platform. Full architecture map, economics and
scaling guide: **`SAAS_ARCHITECTURE.md`** (this folder).

## Deploying the generator

Deploy this folder (the generator root — **not** `templates/`) like any static site:

- **Vercel:** `vercel.com/new` → import the repo/folder → Deploy
- **Netlify:** drag-and-drop the folder, or connect the repo
- **Cloudflare Pages / GitHub Pages:** same — it is plain static HTML/JS/CSS

Requirements:

- The site must be served over **http(s)** — `file://` cannot fetch `templates/`.
- JSZip loads from the jsDelivr CDN on first use (an internet connection is needed when generating).
- Nothing else. No environment variables, no secrets, no server.

## Updating the platform template

`templates/` is a full copy of the CBT system. To offer a newer platform version:

1. Replace the contents of `templates/` with the new system package
   (it must **not** contain `generator.html` / `generator.js`).
2. Update `MANIFEST` in `assets/js/generator.js` if files were added/removed
   (every entry is fetched from `templates/<path>` and zipped as `<path>`).
3. Reload the wizard — the manifest panel and verification list update automatically.

## Licence

See `LICENSE`. Generated client packages carry their own licence terms set in Step 3.

---

## Phase 12 — what client builds do NOT include

Client packages contain the full CBT platform with **complete license enforcement** but **no builder tooling**:
- No License console (`license.html`) and no Client Monitor (`client-monitor.html`) — clients cannot bypass subscription mode.
- `save_site_license` / `extend_site_license` RPCs are swapped to a provider-managed denial — renewals are handled by HMG Concepts remotely (hosted registry), instantly, with no site visit.
- Zero builder-console references in navigation, chatbot, or help — enforced by `applyClientMode()` and verified in the build E2E.
- Every package still ships the full keep-alive stack (scheduled heartbeat, lock-screen keep-alive, auto-restore) so a client platform never pauses — expired or not — and can always be renewed.
