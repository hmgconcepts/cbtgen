# CBT Generator — Full-Stack & SaaS Architecture
### What every generated platform runs on, and how the generator scales as a business
**For:** the CBT System Generator (this package) — the product that serves schools, **tutors and training centres**. 100% free-tier, no AI API, no rented servers.

---

## 1. Is the generated platform full-stack? Yes — here is the proof

A "full-stack" application needs a presentation layer, business logic, a
database, authentication, background jobs and storage. Every generated client
platform has all six — assembled from free-tier services instead of a paid
server you must patch and secure:

| Layer | In every generated platform | Cost |
|---|---|---|
| Presentation | 21-page PWA (installable, offline shell, dark/light, mobile-first) on Vercel/Netlify CDN | Free |
| Authentication | Supabase Auth — email/password, roles (`teacher` / `admin` / `super_admin`), approval workflow, admin impersonation, idle lock, refresh tokens | Free tier |
| Database | Supabase Postgres with **row-level security** on every table — teachers see only their exams/results; students see only open exams; admins see the platform | Free tier (500 MB) |
| Business logic | **45 server-side RPC functions** — secure exam delivery, attempt counting, submission, appeals, live invigilation sessions, license control, audit events, admin governance | Free tier |
| Background jobs | GitHub Actions heartbeat + auto-restore (keeps the free database warm), Drive auto-backup on admin visits, Edge Function ping | Free |
| Storage | Supabase Storage (1 GB) as the archive vault — photos/exports offload from the 500 MB database | Free tier |

Why BaaS instead of a Node server: zero patching, zero DevOps, no monthly
bill, and the security posture is enforced in the database (RLS) rather than
hoping every front-end path remembers to check. The trade-off — no custom
server code — is exactly what a 100%-client architecture like this one wants.

## 2. The SaaS primitives already built into every generated platform

- **Multi-role tenancy per deployment** — teachers own their data (RLS-scoped);
  admins govern; super_admin (the proprietor) holds owner controls.
- **Subscription licensing** — the Site License console: lifetime /
  subscription / warning / grace / expired lifecycle, HMAC-SHA256 offline
  perpetual tokens, quick-extend (+30/+90/+365), remote registry override.
- **Client registry & monitoring (your side)** — the 📡 Client Monitor tracks
  every client deployment's license status, expiry and heartbeat; the
  registry always wins over local values.
- **Audit trail** — server-side `log_audit_event` on every governance action.
- **Heartbeat keep-alive** — the free-tier database never pauses for
  inactivity; renewal is always one click.
- **White-labeling** — the generator brands every page, PWA manifest,
  service-worker cache, sitemap, robots and SEO for the client's identity.

## 3. The scaling model: a SaaS factory

One generator run = one branded, licensed, independently deployed client
platform with its OWN Supabase project, its OWN storage and its OWN domain.
This is deliberately the right architecture at free tier:

- **Isolation by design** — a school can never see another school's exams or
  results. A shared-tenant SaaS would pool every client's data behind one
  database: one leak or one bad query touches every customer.
- **Cost stays at zero per client** — free tier is per-project; the factory
  model scales to dozens of clients before any paid tier is even considered.
- **Failure isolation** — one client's traffic spike or bad data never
  affects the others.
- **Exit story** — every client can export their complete data envelope and
  walk away (Data & Drive Sync, disaster recovery, per-table exports). That
  honesty is a selling point, not a risk.

When a client outgrows free tier (1,000+ concurrent sitters, PITR backups),
Supabase Pro on THEIR project is the upgrade path — their cost, not yours.

## 4. Free-tier economics of the generator business

| Item | Tool | Cost |
|---|---|---|
| Generator site | Vercel/Netlify static hosting | Free |
| Client platform hosting | Vercel/Netlify static hosting | Free |
| Client database/auth/storage | Supabase free tier (per client project) | Free |
| Heartbeat + restore | GitHub Actions | Free |
| Exam proctoring | Browser camera/mic + CDN face-api (client-side) | Free |
| Analytics / psychometrics / adaptive delivery | All client-side, rule-based | Free |
| AI question generation | AI Prompts Studio — the CLIENT pastes prompts into any free AI chat; no AI API is ever called by the platform | Free |
| Backup | School's own Google Drive (OAuth, `drive.file` scope) | Free |

## 5. Deployment of the generator itself

1. Deploy THIS folder (not `templates/`) as a static site (Vercel → import →
   deploy). `vercel.json`, `_headers` and `robots.txt` are included.
2. There is no database behind the generator — it is a pure client-side build
   tool. Nothing to configure.
3. A build: fill the client's identity + their EMPTY-until-provided Supabase
   URL and anon key + deploy URL → Generate → hand the ZIP to the client.
4. Client's 4-step go-live: create a Supabase project → run
   `database/complete-schema.sql` once → paste URL + anon key into
   `teacher.html`/`student.html`/`admin.html`/`link_checker.html` → deploy.
   (Full detail: `templates/DEPLOYMENT.md` inside every generated package.)

## 6. Standing rules (learned from live incidents)

- **Update the DATABASE whenever you update the FILES** — after deploying a
  new package version, re-run `database/complete-schema.sql` (idempotent).
  The generated platforms warn with a persistent red banner and the
  deployment validator's live probe catches it pre-flight.
- **Never pre-fill credentials** — the generator's Supabase fields stay empty;
  the hard leak-scan fails any build that would ship builder credentials.
- **Publish → OPEN by default** — the teacher form resets to the recommended
  open default; locked publishing always warns at publish, share and print.

---

## Phase 12 — Client-mode licensing (provider-managed subscriptions)

**Model:** the builder (HMG Concepts) sells platforms on subscription or one-time. Clients must never bypass subscription mode:

- **Templates ship no consoles:** `templates/license.html` and `templates/client-monitor.html` are **deleted**. Client builds contain the full license *engine* (lock screens, banners, heartbeat, registry checks) but **no UI to change a license**.
- **`applyClientMode()` (generator.js)** runs first in the text pipeline (before branding and the credential leak-scan). It:
  1. strips every `/*BUILDER-ONLY*/ … /*BUILDER-ONLY-END*/` and `<!--BUILDER-ONLY--> … <!--/BUILDER-ONLY-->` block (master files keep these blocks; templates retain the markers by design — the strip happens at build time);
  2. swaps `/*LICENSE-SELF-SERVICE-GUARD*/ … /*END*/` blocks in `database/complete-schema.sql` so `save_site_license` / `extend_site_license` `RAISE EXCEPTION 'License changes on this deployment are managed by the platform provider (HMG Concepts). Contact your provider to renew.'`
- **Renewals are provider-side:** the client's lock screen/banners point to HMG Concepts (WhatsApp · email) — no quick-extend, no self-service. The builder renews by updating the hosted `license-registry.json` or the client's license row directly; the client platform re-checks and unlocks instantly.
- **Never-pause guarantee:** every client package ships the scheduled heartbeat workflow + lock-screen keep-alive + auto-restore, and the builder's Client Monitor adds a weekly 🫀 **keep-alive sweep** that pings every registered client's `sc_keep_alive` RPC using the Supabase URL + anon key stored in the builder's registry — so expired-but-unrenewed platforms never fall to Supabase's 7-day inactivity pause and can be renewed whenever the client is ready.
- **Integrity verified in the build E2E:** client ZIPs must contain no `license.html`, no `client-monitor.html`, no BUILDER-ONLY marker text, no builder-console references in the bot/help/nav, provider-managed license RPCs, and no `sw.js` precache entries for the removed pages.
