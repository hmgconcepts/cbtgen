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
verifiable certificates, 1,000-student submission resilience, and a
`database/` folder whose `complete-schema.sql` is the single, all-inclusive,
idempotent, run-once setup file. See `templates/README.md` for the platform's
own documentation.

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
