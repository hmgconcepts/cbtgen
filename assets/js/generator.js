/* ====================================================================
   generator.js — HMG CBT Pro Whitelabel System Generator Engine
   ====================================================================
   Includes:
     • 50+ Professional & Sophisticated Themes
     • 50+ Modern Typography Font Stacks (Google Fonts + System Stacks)
     • 50 Responsive Layout Styles (real CSS layers)
     • In-Browser ZIP Packaging Engine via JSZip
   ==================================================================== */
const CBTGenerator = {
  // 50+ Professional Themes
  THEMES: [
    { id: 'emerald-elegance', name: 'Emerald Elegance (Default)', primary: '#10b981', accent: '#8b5cf6', bg: '#09090b', surface: '#18181b' },
    { id: 'indigo-prestige', name: 'Indigo Prestige (Oxford)', primary: '#4f46e5', accent: '#ec4899', bg: '#0b0f19', surface: '#111827' },
    { id: 'sapphire-slate', name: 'Sapphire Slate (Cambridge)', primary: '#0ea5e9', accent: '#f59e0b', bg: '#0c1222', surface: '#1e293b' },
    { id: 'crimson-executive', name: 'Crimson Executive (Harvard)', primary: '#dc2626', accent: '#fbbf24', bg: '#180808', surface: '#261010' },
    { id: 'cyberpunk-neon', name: 'Cyberpunk Neon', primary: '#06b6d4', accent: '#f43f5e', bg: '#050508', surface: '#0f0f18' },
    { id: 'nordic-frost', name: 'Nordic Frost (Light Mode)', primary: '#0284c7', accent: '#6366f1', bg: '#f8fafc', surface: '#ffffff' },
    { id: 'obsidian-gold', name: 'Obsidian & Royal Gold', primary: '#eab308', accent: '#a855f7', bg: '#0a0a0a', surface: '#171717' },
    { id: 'deep-forest', name: 'Deep Forest Pine', primary: '#059669', accent: '#d97706', bg: '#06130d', surface: '#0e241b' },
    { id: 'lavender-dream', name: 'Lavender Amethyst', primary: '#a855f7', accent: '#3b82f6', bg: '#10091d', surface: '#1b122c' },
    { id: 'sunset-amber', name: 'Sunset Amber & Coral', primary: '#f97316', accent: '#e11d48', bg: '#140c06', surface: '#24170d' },
    { id: 'tokyo-night', name: 'Tokyo Night Cyber', primary: '#7aa2f7', accent: '#bb9af7', bg: '#1a1b26', surface: '#24283b' },
    { id: 'matrix-terminal', name: 'Matrix Hacker Green', primary: '#22c55e', accent: '#16a34a', bg: '#000000', surface: '#0d160e' },
    { id: 'dracula-pro', name: 'Dracula Pro Vamp', primary: '#bd93f9', accent: '#ff79c6', bg: '#282a36', surface: '#44475a' },
    { id: 'rose-gold', name: 'Rose Gold Luxury', primary: '#fb7185', accent: '#fbbf24', bg: '#150a0d', surface: '#26141a' },
    { id: 'ocean-abyss', name: 'Ocean Abyss Blue', primary: '#38bdf8', accent: '#818cf8', bg: '#030712', surface: '#0f172a' },
    { id: 'titanium-mono', name: 'Titanium Monochrome', primary: '#f4f4f5', accent: '#71717a', bg: '#09090b', surface: '#18181b' },
    { id: 'academic-maroon', name: 'Academic Maroon & Ivory', primary: '#991b1b', accent: '#d97706', bg: '#1c0a0a', surface: '#2e1212' },
    { id: 'electric-violet', name: 'Electric Violet Spark', primary: '#8b5cf6', accent: '#06b6d4', bg: '#0d061a', surface: '#1b0e33' },
    { id: 'teal-oasis', name: 'Teal Oasis Mint', primary: '#14b8a6', accent: '#f59e0b', bg: '#041312', surface: '#0a2322' },
    { id: 'midnight-navy', name: 'Midnight Navy Elite', primary: '#3b82f6', accent: '#60a5fa', bg: '#020617', surface: '#0f172a' },
    { id: 'solar-flare', name: 'Solar Flare Orange', primary: '#ea580c', accent: '#facc15', bg: '#140904', surface: '#26140b' },
    { id: 'coffee-mocha', name: 'Espresso Mocha Warm', primary: '#b45309', accent: '#d97706', bg: '#150d06', surface: '#26190f' },
    { id: 'alpine-snow', name: 'Alpine Snow Minimal (Light)', primary: '#2563eb', accent: '#475569', bg: '#f1f5f9', surface: '#ffffff' },
    { id: 'regal-purple', name: 'Regal Sovereign Purple', primary: '#9333ea', accent: '#f59e0b', bg: '#130421', surface: '#230a3b' },
    { id: 'emerald-mint-light', name: 'Mint Leaf Crisp (Light)', primary: '#059669', accent: '#2563eb', bg: '#f0fdf4', surface: '#ffffff' },
    { id: 'graphite-dark', name: 'Graphite Industrial', primary: '#a1a1aa', accent: '#10b981', bg: '#121214', surface: '#202024' },
    { id: 'neon-synthwave', name: '80s Synthwave Sunset', primary: '#f43f5e', accent: '#8b5cf6', bg: '#11051b', surface: '#220d35' },
    { id: 'coastal-breeze', name: 'Coastal Breeze Turquoise', primary: '#06b6d4', accent: '#10b981', bg: '#051419', surface: '#0d2830' },
    { id: 'vintage-paper', name: 'Vintage Archival (Sepia)', primary: '#854d0e', accent: '#a16207', bg: '#fefce8', surface: '#fef9c3' },
    { id: 'blood-orange', name: 'Blood Orange Zing', primary: '#f97316', accent: '#dc2626', bg: '#180703', surface: '#2b0f07' },
    { id: 'hacker-amber', name: 'Amber CRT Retro', primary: '#fbbf24', accent: '#f59e0b', bg: '#080501', surface: '#170f03' },
    { id: 'steel-blue', name: 'Steel Blue Aerospace', primary: '#64748b', accent: '#38bdf8', bg: '#0b0f19', surface: '#1e293b' },
    { id: 'tropical-flora', name: 'Tropical Flora Coral', primary: '#fb7185', accent: '#2dd4bf', bg: '#14060b', surface: '#290f18' },
    { id: 'glacier-cyan', name: 'Glacier Cyan Crystal', primary: '#22d3ee', accent: '#a855f7', bg: '#041018', surface: '#092130' },
    { id: 'onyx-carbon', name: 'Onyx Carbon Fiber', primary: '#e4e4e7', accent: '#3f3f46', bg: '#050505', surface: '#121212' },
    { id: 'autumn-maple', name: 'Autumn Maple Rust', primary: '#c2410c', accent: '#b45309', bg: '#180904', surface: '#2c1309' },
    { id: 'space-cadet', name: 'Space Cadet Twilight', primary: '#6366f1', accent: '#ec4899', bg: '#0a0a1f', surface: '#16163b' },
    { id: 'sage-herbal', name: 'Sage Herbal Green', primary: '#4ade80', accent: '#06b6d4', bg: '#061309', surface: '#0e2615' },
    { id: 'aurora-borealis', name: 'Aurora Borealis Glow', primary: '#34d399', accent: '#818cf8', bg: '#021516', surface: '#072729' },
    { id: 'champagne-silk', name: 'Champagne Silk (Light)', primary: '#d97706', accent: '#4f46e5', bg: '#fafaf9', surface: '#ffffff' },
    { id: 'cosmic-purple', name: 'Cosmic Nebula Dark', primary: '#c084fc', accent: '#38bdf8', bg: '#10041f', surface: '#220a40' },
    { id: 'cherry-blossom', name: 'Cherry Blossom Pastel', primary: '#f472b6', accent: '#fb7185', bg: '#190610', surface: '#2d0f1f' },
    { id: 'desert-sand', name: 'Desert Sand Dune', primary: '#ca8a04', accent: '#ea580c', bg: '#181203', surface: '#2b2108' },
    { id: 'deep-marina', name: 'Deep Marina Wave', primary: '#0284c7', accent: '#14b8a6', bg: '#040e1a', surface: '#0a1d33' },
    { id: 'platinum-clean', name: 'Platinum Clean SaaS (Light)', primary: '#0f172a', accent: '#2563eb', bg: '#f8fafc', surface: '#ffffff' },
    { id: 'ruby-gem', name: 'Ruby Gem Radiant', primary: '#e11d48', accent: '#f59e0b', bg: '#18040b', surface: '#2c0b17' },
    { id: 'monokai-dev', name: 'Monokai Developer Dark', primary: '#a6e22e', accent: '#fd971f', bg: '#272822', surface: '#3e3d32' },
    { id: 'nord-arctic', name: 'Nord Arctic Frost', primary: '#88c0d0', accent: '#81a1c1', bg: '#2e3440', surface: '#3b4252' },
    { id: 'palenight-modern', name: 'Material Palenight', primary: '#82aaff', accent: '#c792ea', bg: '#292d3e', surface: '#32374d' },
    { id: 'gruvbox-retro', name: 'Gruvbox Retro Warm', primary: '#fabd2f', accent: '#fb4934', bg: '#282828', surface: '#3c3836' }
  ],

  // 50+ Typography Font Stacks
  FONTS: [
    { id: 'plus-jakarta', name: 'Plus Jakarta Sans (Default Modern)', family: "'Plus Jakarta Sans', sans-serif" },
    { id: 'inter', name: 'Inter (Clean Standard UI)', family: "'Inter', sans-serif" },
    { id: 'outfit', name: 'Outfit (Geometric High-Tech)', family: "'Outfit', sans-serif" },
    { id: 'space-grotesk', name: 'Space Grotesk (Neo-Brutalist)', family: "'Space Grotesk', sans-serif" },
    { id: 'syne', name: 'Syne (Bold Expressive)', family: "'Syne', sans-serif" },
    { id: 'lexend', name: 'Lexend (Maximum Reading Fluency)', family: "'Lexend', sans-serif" },
    { id: 'manrope', name: 'Manrope (Modern Precision)', family: "'Manrope', sans-serif" },
    { id: 'dm-sans', name: 'DM Sans (Subtle Low-Contrast)', family: "'DM Sans', sans-serif" },
    { id: 'sora', name: 'Sora (Futuristic UI)', family: "'Sora', sans-serif" },
    { id: 'epilogue', name: 'Epilogue (Contemporary Editorial)', family: "'Epilogue', sans-serif" },
    { id: 'fira-code', name: 'Fira Code (Developer Monospace)', family: "'Fira Code', monospace" },
    { id: 'jetbrains-mono', name: 'JetBrains Mono (STEM Precise)', family: "'JetBrains Mono', monospace" },
    { id: 'roboto', name: 'Roboto (Google Standard)', family: "'Roboto', sans-serif" },
    { id: 'montserrat', name: 'Montserrat (Classic Architectural)', family: "'Montserrat', sans-serif" },
    { id: 'poppins', name: 'Poppins (Geometric Friendly)', family: "'Poppins', sans-serif" },
    { id: 'raleway', name: 'Raleway (Elegant Thin)', family: "'Raleway', sans-serif" },
    { id: 'nunito', name: 'Nunito (Soft Rounded)', family: "'Nunito', sans-serif" },
    { id: 'playfair-display', name: 'Playfair Display (Academic Serif)', family: "'Playfair Display', serif" },
    { id: 'merriweather', name: 'Merriweather (Classic Reading Serif)', family: "'Merriweather', serif" },
    { id: 'lora', name: 'Lora (Contemporary Book Serif)', family: "'Lora', serif" },
    { id: 'cinzel', name: 'Cinzel (Classical Inscriptional)', family: "'Cinzel', serif" },
    { id: 'cormorant-garamond', name: 'Cormorant Garamond (Oxford Serif)', family: "'Cormorant Garamond', serif" },
    { id: 'chivo', name: 'Chivo (High-Impact Grotesque)', family: "'Chivo', sans-serif" },
    { id: 'urbanist', name: 'Urbanist (Digital Minimalist)', family: "'Urbanist', sans-serif" },
    { id: 'work-sans', name: 'Work Sans (Optimized Screen UI)', family: "'Work Sans', sans-serif" },
    { id: 'karla', name: 'Karla (Quirky Grotesque)', family: "'Karla', sans-serif" },
    { id: 'archivo', name: 'Archivo (Technical Headline)', family: "'Archivo', sans-serif" },
    { id: 'red-hat-display', name: 'Red Hat Display (Enterprise Cloud)', family: "'Red Hat Display', sans-serif" },
    { id: 'be-vietnam-pro', name: 'Be Vietnam Pro (International Standard)', family: "'Be Vietnam Pro', sans-serif" },
    { id: 'cabin', name: 'Cabin (Humanist Sans)', family: "'Cabin', sans-serif" },
    { id: 'inconsolata', name: 'Inconsolata (Clean Terminal)', family: "'Inconsolata', monospace" },
    { id: 'albert-sans', name: 'Albert Sans (Modern Nordic)', family: "'Albert Sans', sans-serif" },
    { id: 'source-sans-3', name: 'Source Sans 3 (Adobe Standard)', family: "'Source Sans 3', sans-serif" },
    { id: 'libre-baskerville', name: 'Libre Baskerville (Traditional Exam)', family: "'Libre Baskerville', serif" },
    { id: 'instrument-sans', name: 'Instrument Sans (Contemporary Design)', family: "'Instrument Sans', sans-serif" },
    { id: 'figtree', name: 'Figtree (Fresh Contemporary)', family: "'Figtree', sans-serif" },
    { id: 'overpass', name: 'Overpass (Highway Signage Standard)', family: "'Overpass', sans-serif" },
    { id: 'pt-sans', name: 'PT Sans (Universal Pan-European)', family: "'PT Sans', sans-serif" },
    { id: 'quicksand', name: 'Quicksand (Friendly Display)', family: "'Quicksand', sans-serif" },
    { id: 'exo-2', name: 'Exo 2 (Geometric Sci-Fi)', family: "'Exo 2', sans-serif" },
    { id: 'ibm-plex-sans', name: 'IBM Plex Sans (Corporate Industrial)', family: "'IBM Plex Sans', sans-serif" },
    { id: 'ibm-plex-mono', name: 'IBM Plex Mono (Engineering Code)', family: "'IBM Plex Mono', monospace" },
    { id: 'crimson-pro', name: 'Crimson Pro (Bookish Examination)', family: "'Crimson Pro', serif" },
    { id: 'frank-ruhl-libre', name: 'Frank Ruhl Libre (Literary Editorial)', family: "'Frank Ruhl Libre', serif" },
    { id: 'space-mono', name: 'Space Mono (Fixed Width Retro)', family: "'Space Mono', monospace" },
    { id: 'spectral', name: 'Spectral (Screen Reading Serif)', family: "'Spectral', serif" },
    { id: 'barlow', name: 'Barlow (Low-Contrast Signage)', family: "'Barlow', sans-serif" },
    { id: 'public-sans', name: 'Public Sans (US Web Standards)', family: "'Public Sans', sans-serif" },
    { id: 'fraunces', name: 'Fraunces (Expressive Old Style)', family: "'Fraunces', serif" },
    { id: 'system-ui', name: 'Native System Stack (San Francisco/Segoe)', family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }
  ],

  // 50 Layout Styles — each maps to a real CSS layer (LAYOUT_CSS)
  LAYOUTS: [
    { id: 'classic-sidebar', name: 'Classic Sidebar Left (Standard)' },
    { id: 'top-navbar', name: 'Top Navbar Floating' },
    { id: 'glassmorphism-glow', name: 'Glassmorphism Backdrop Glow' },
    { id: 'brutalist-minimal', name: 'Brutalist High-Contrast' },
    { id: 'floating-island', name: 'Floating Island Cards' },
    { id: 'split-executive', name: 'Split Screen Executive' },
    { id: 'terminal-developer', name: 'Compact Developer Terminal' },
    { id: 'tabbed-focus', name: 'Tabbed Focus & Single-Page' },
    { id: 'academic-broadsheet', name: 'Academic Broadsheet Portal' },
    { id: 'mobile-drawer-app', name: 'Mobile App Bottom-Nav Shell' },
    { id: 'dashboard-grid', name: 'Dashboard Modular Grid' },
    { id: 'cinema-wide', name: 'Cinema Ultra-Wide Canvas' },
    { id: 'stacked-feed', name: 'Vertical Stacked Feed' },
    { id: 'zen-distraction-free', name: 'Zen Distraction-Free Center' },
    { id: 'sidebar-right', name: 'Sidebar Right Invigilation' },
    { id: 'compact-kiosk', name: 'Compact Kiosk Lockdown' },
    { id: 'stepper-wizard', name: 'Multi-Step Guided Wizard' },
    { id: 'cards-masonry', name: 'Masonry Assessment Cards' },
    { id: 'dock-bottom', name: 'Mac-Style Floating Bottom Dock' },
    { id: 'dual-pane-review', name: 'Dual-Pane Side-by-Side Review' },
    { id: 'magazine-editorial', name: 'Magazine Editorial Spread' },
    { id: 'corporate-trust', name: 'Corporate Trust Banking' },
    { id: 'ivory-league', name: 'Ivy-League Prospectus' },
    { id: 'soft-neumorphic', name: 'Soft Neumorphic Panels' },
    { id: 'claymorphism', name: 'Claymorphism Playful Cards' },
    { id: 'aurora-gradient', name: 'Aurora Gradient Mesh' },
    { id: 'midnight-observatory', name: 'Midnight Observatory' },
    { id: 'heritage-parchment', name: 'Heritage Parchment Academy' },
    { id: 'scandi-air', name: 'Scandinavian Air & Whitespace' },
    { id: 'swiss-grid', name: 'Swiss International Grid' },
    { id: 'bento-box', name: 'Bento Box Modular Tiles' },
    { id: 'newspaper-broadsheet', name: 'Newspaper Broadsheet Columns' },
    { id: 'terminal-amber', name: 'Amber Terminal Console' },
    { id: 'blueprint-draft', name: 'Engineering Blueprint Draft' },
    { id: 'gallery-museum', name: 'Gallery Museum Framing' },
    { id: 'focus-spotlight', name: 'Focus Spotlight Stage' },
    { id: 'calm-study-hall', name: 'Calm Study Hall' },
    { id: 'vivid-classroom', name: 'Vivid Classroom Energy' },
    { id: 'mono-resume', name: 'Monochrome Résumé Precision' },
    { id: 'eco-botanical', name: 'Eco Botanical Notes' },
    { id: 'fintech-dashboard', name: 'FinTech Dashboard Pro' },
    { id: 'startup-launch', name: 'Startup Launch Landing' },
    { id: 'exam-hall-formal', name: 'Formal Exam Hall' },
    { id: 'library-index', name: 'Library Card Index' },
    { id: 'gridlock-data', name: 'Gridlock Data Dense' },
    { id: 'ribbon-banner', name: 'Ribbon & Banner Celebratory' },
    { id: 'geometric-bauhaus', name: 'Geometric Bauhaus Blocks' },
    { id: 'typewriter-script', name: 'Typewriter Script Vintage' },
    { id: 'neon-outline', name: 'Neon Outline Gaming' },
    { id: 'accessible-large', name: 'Accessible Large-Print' }
  ],

  defaultConfig: {
    institutionName: 'God of Seed Academy CBT',
    tagline: 'Excellence in Computer-Based Testing & STEM Practice',
    themeId: 'emerald-elegance',
    fontId: 'plus-jakarta',
    layoutId: 'classic-sidebar',
    primaryColor: '#10b981',
    accentColor: '#8b5cf6',
    /* ISSUE-2 FIX: deliberately EMPTY. These are the CLIENT's credentials,
       typed fresh in Step 3 for every package — never pre-filled with the
       builder's own project keys. */
    supabaseUrl: '',
    supabaseAnonKey: '',
    driveClientId: '',
    supportEmail: 'hismarvellousgrace@gmail.com',
    supportPhone: '+234 810 086 6322',
    defaultPassmark: 50,
    licenseModel: 'lifetime',
    licenseCycle: '',
    licenseExpires: '',
    licenseGraceDays: 7,
    licenseRegistryUrl: '',
    licenseSalt: 'HMG_CBT_PRO_V10_SECURE_SALT_2026',
    ownerEmail: '',
      deployUrl: ''      // optional public URL of the client's deployment (brands sitemap/robots)
    },

  /* The complete manifest — every file a deployable CLIENT platform needs.
     All files live under templates/ on THIS deployment; they are fetched from
     there and zipped at their root-relative client paths (templates/ stripped),
     so the generated ZIP is the standalone CBT system with NO generator files
     inside — the two products never ship together.
     (The generator must be deployed to GitHub Pages / Vercel to work — it
     cannot run from file://.) */
  TEMPLATE_PREFIX: 'templates/',
  MANIFEST: {
    pages: [
      'index.html', 'student.html', 'teacher.html', 'cbt-multi.html', 'cbt-prompts.html', 'question-types.html',
      'admin.html', 'admin-data.html', 'storage.html', 'platform-health.html',
      'status-manager.html', 'settings.html', 'activity_log.html',
      'certificate.html', 'deployment_validator.html', 'feature_guide.html',
      'link_checker.html', 'offline.html', 'disaster-recovery.html'
    ],
    scripts: [
      'assets/js/app.js', 'assets/js/keepalive.js', 'assets/js/site-license.js', 'assets/js/license.js',
      'assets/js/security-guard.js', 'assets/js/data-portability.js', 'assets/js/drive-sync.js',
      'assets/js/prompt-studio.js', 'assets/js/cbt-engine.js', 'assets/js/cbt-types.js',
      'assets/js/cbt-exam-kit.js', 'assets/js/cbt-richtext.js', 'assets/js/csv-bridge.js',
      'assets/js/site-help.js', 'assets/js/chatbot.js', 'assets/js/psychometrics.js', 'sw.js', 'pwa_install_enforcer.js'
    ],
    styles: ['assets/css/style.css'],
    images: [
      'assets/hmg-academy-logo.png', 'assets/img/hmg-academy-logo.png', 'assets/img/hmg-icon.svg',
      'hmg-academy-logo.png', 'hmg-icon.svg', 'assets/sample-heart-diagram.png'
    ],
    data: [
      'PROMPT_TEMPLATE.md',
      'database/sample-question-bank.csv', 'database/students_import_template.csv',
      'database/further_maths_sample.csv', 'database/sample-multi-subject.csv'
    ],
    docs: [
      'README.md', 'DEPLOYMENT.md', 'FEATURES.md', 'SECURITY.md', 'ANTI_CHEAT_CONFIG_GUIDE.md',
      'SUPABASE_FREE_TIER_PROTECTION.md', 'GOOGLE_DRIVE_BACKUP.md', 'LICENSE', 'llms.txt',
      'database/README.md', 'FIXES_APPLIED.md', 'PHASE2_ENHANCEMENTS.md',
      'PHASE3_AUDIT_AND_FIXES.md', 'PHASE4_AUDIT_AND_FIXES.md', 'PHASE5_AUDIT_AND_FIXES.md',
      'PHASE6_AUDIT_AND_FIXES.md', 'PHASE7_AUDIT_AND_FIXES.md', 'PHASE8_AUDIT_AND_FIXES.md',
      'PHASE9_AUDIT_AND_FIXES.md', 'PHASE10_ENTERPRISE_FEATURES.md', 'PHASE10B_EXAM_REACHABILITY_HOTFIX.md',
      'PHASE11_WIRING_AND_COMPLIANCE_AUDIT.md'
    ],
    infra: [
      'database/complete-schema.sql', 'database/keep-alive.sql', 'database/security-hardening.sql',
      'database/drive-sync.sql', 'database/storage-offload.sql', 'database/demo-seed.sql',
      'database/demo-users.sql',
      'vercel.json', '_headers', '.nojekyll', 'robots.txt',
      'sitemap.xml', 'manifest.webmanifest', 'browserconfig.xml',
      'api/keepalive.js', '.github/workflows/supabase-heartbeat.yml',
      '.github/workflows/supabase-auto-restore.yml', 'supabase/functions/ping/index.ts'
    ]
  },

  /* ── PHASE 12: CLIENT MODE ──────────────────────────────────────────
     The generator builds CLIENT packages. Builder-only tooling — the Site
     License console (license.html) and the Client Monitor
     (client-monitor.html) — must never ship to clients, so a client can
     never self-extend or inspect the subscription machinery. The master
     repo marks those blocks with BUILDER-ONLY markers; this pass strips
     them. It also swaps the license self-service guard in
     database/complete-schema.sql: on client deployments the license RPCs
     permanently refuse local changes — renewals are applied remotely by
     the provider (HMG Concepts) via the license registry, which always
     wins. Subscription mode can never be bypassed from inside a client
     deployment. */
  applyClientMode(text) {
    let t = String(text);
    t = t.replace(/\/\*BUILDER-ONLY\*\/[\s\S]*?\/\*BUILDER-ONLY-END\*\//g, '');
    t = t.replace(/<!--BUILDER-ONLY-->[\s\S]*?<!--\/BUILDER-ONLY-->/g, '');
    t = t.replace(
      /\/\*LICENSE-SELF-SERVICE-GUARD\*\/[\s\S]*?\/\*LICENSE-SELF-SERVICE-GUARD-END\*\//g,
      "  /* Client deployment: license changes are PROVIDER-MANAGED. Extensions\n" +
      "     and edits are applied remotely by HMG Concepts via the license\n" +
      "     registry — never by local self-service, so the subscription model\n" +
      "     cannot be bypassed on client platforms. */\n" +
      "  RAISE EXCEPTION 'License changes on this deployment are managed by the platform provider (HMG Concepts). Contact your provider to renew.';"
    );
    return t;
  },

  /* Files whose absence makes the package BROKEN (vs nice-to-have). */
  CRITICAL: new Set(['index.html', 'student.html', 'teacher.html', 'admin.html', 'cbt-multi.html',
    'cbt-prompts.html', 'assets/js/app.js', 'assets/js/cbt-types.js', 'assets/js/cbt-engine.js',
    'assets/js/prompt-studio.js', 'assets/js/data-portability.js', 'assets/js/site-license.js',
    'assets/js/drive-sync.js', 'assets/css/style.css', 'database/complete-schema.sql']),

  async fetchText(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
    return await res.text();
  },

  async fetchBinary(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
    return new Uint8Array(await res.arrayBuffer());
  },

  /* ── Phase 3 build-output upgrades ─────────────────────────────
     1. brandHtmlHead — makes the CHOSEN font actually load. The pages ship
        a Plus Jakarta Sans <link>; swapping only the CSS font-family (the
        old behaviour) silently fell back to a generic sans for every
        non-default font. The link now requests the selected family.
     2. brandManifest — the PWA installs under the client's name & colours.
     3. brandSW — unique service-worker cache per client (no cross-client
        cache collisions when several deployments share a device).
     4. brandSitemapRobots — points sitemap.xml / robots.txt at the
        client's real deployment URL when one is provided. */
  brandHtmlHead(text, cfg) {
    const font = (this.FONTS || []).find(f => f.id === cfg.fontId) || (this.FONTS || [])[0];
    if (!font) return text;
    const m = String(font.family || '').match(/['"]([^'"]+)['"]/);
    const gf = m ? m[1] : '';
    if (!gf || /^(system-ui|ui-|-apple|Segoe|Roboto|Helvetica|Arial|Georgia|Times|Courier|monospace|cursive)/i.test(gf)) return text;
    const urlName = gf.trim().replace(/\s+/g, '+');
    /* weights omitted on purpose: some display families ship single
       weights and a weighted request 400-errors, loading nothing */
    return text.replace(/(fonts\.googleapis\.com\/css2\?family=)[^"']+/, `$1${urlName}&display=swap`);
  },
  brandManifest(text, cfg) {
    try {
      const m = JSON.parse(text);
      m.name = cfg.institutionName + ' CBT';
      m.short_name = String(cfg.institutionName || 'CBT').slice(0, 12);
      if (cfg.tagline) m.description = cfg.tagline;
      if (cfg.primary) m.theme_color = cfg.primary;
      if (cfg.bg) m.background_color = cfg.bg;
      return JSON.stringify(m, null, 2);
    } catch (e) { return this.brandText(text, cfg); }
  },
  brandSW(text, cfg) {
    const slug = String(cfg.slug || 'client').replace(/[^a-z0-9-]/gi, '').toLowerCase() || 'client';
    return text.replace(/(CACHE_NAME\s*=\s*)'[^']*'/, `$1'${slug}-cbt-shell-v1'`);
  },
  brandSitemapRobots(text, cfg) {
    let out = text;
    const base = String(cfg.deployUrl || '').trim().replace(/\/+$/, '');
    if (base && /^https:\/\//.test(base)) {
      out = out.replace(/__CLIENT_SITE_URL__/g, () => base);
      out = out.replace(/https:\/\/cbtsystem-hmgacademy\.vercel\.app/g, base);
      out = out.replace(/https:\/\/hmgacademyhub\.github\.io\/cbtplatform/g, base);
      out = out.replace(/Host: https:\/\/hmgacademyhub\.github\.io/, 'Host: ' + base);
    } else {
      /* sitemap/robots URLs MUST be absolute — without a known deployment URL
         ship an explicit, replaceable marker (commented in the files). */
      out = out.replace(/__CLIENT_SITE_URL__/g, () => 'https://YOUR-DEPLOYMENT-URL');
    }
    return this.brandText(out, cfg);
  },

  /* ══ SEO pass for HTML/docs ══════════════════════════════════════════
     Resolves __CLIENT_SITE_URL__ (canonical, og:url, og:image, JSON-LD url).
     With a Deployment URL → absolute, search-engine-perfect URLs.
     Without → root-relative URLs (/student.html), which stay correct on
     ANY domain the client later deploys to — never a wrong-domain canonical. */
  brandSeo(text, cfg) {
    const base = String(cfg.deployUrl || '').trim().replace(/\/+$/, '');
    if (base && /^https:\/\//.test(base)) {
      return text.replace(/__CLIENT_SITE_URL__/g, () => base);
    }
    return text.replace(/__CLIENT_SITE_URL__\//g, '/')   /* token + slash → root-relative */
               .replace(/__CLIENT_SITE_URL__/g, '/');
  },

  /* Brand a text file: name, tagline, colors, Supabase credentials. */
  brandText(text, cfg) {
    const name = cfg.institutionName.replace(/'/g, "''");
    let out = text;
    // Credentials first — placeholder TOKENS are the primary mechanism…
    out = out.replace(/__CLIENT_SUPABASE_URL__/g, cfg.supabaseUrl);
    out = out.replace(/__CLIENT_SUPABASE_KEY__/g, cfg.supabaseAnonKey);
    // …and the legacy HMG literals are swept too, in case any file still
    // carries them (defence in depth — nothing of ours may ever ship).
    out = out.replace(/https:\/\/pstnsaqjshmtintjrnas\.supabase\.co/g, cfg.supabaseUrl);
    out = out.replace(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzdG5zYXFqc2htdGludGpybmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MDEzODUsImV4cCI6MjA5MTI3NzM4NX0\.KNVgpVN0xp1njin1HL3udntc7psfzjnz7mqzpEN_Z6w/g, cfg.supabaseAnonKey);
    // Brand names (longest first so the short one cannot corrupt the long one)
    out = out.replace(/HMG Academy CBT Pro/g, cfg.institutionName);
    out = out.replace(/HMG Academy CBT/g, cfg.institutionName);
    out = out.replace(/HMG Academy/g, cfg.institutionName);
    out = out.replace(/Excellence in Computer-Based Testing & STEM Practice/g, cfg.tagline);
    // SQL seed branding (safe: escaped for SQL single quotes above)
    if (text.indexOf('COMPLETE') > -1 || text.indexOf('CREATE TABLE') > -1) {
      out = out.replace(/'HMG Academy CBT Pro'/g, `'${name}'`);
      out = out.replace(/'#10b981'/g, `'${cfg.primaryColor}'`);
      out = out.replace(/'#8b5cf6'/g, `'${cfg.accentColor}'`);
    }
    return out;
  },

  /* Apply the selected theme + font by rewriting the CSS custom
     properties in style.css (the OLD generator only swapped the first
     font-family declaration — themes never actually applied). */
  /* ════════════════════════════════════════════════════════════════
     LAYOUT ENGINE — layoutId is not a label: every layout below appends a
     distinct CSS layer to style.css that reshapes radius, shadows, content
     width, header treatment and card styling across the whole platform.
     ════════════════════════════════════════════════════════════════ */
  LAYOUT_CSS: {
    'classic-sidebar':      { radius: '14px', wrap: '1280px' },
    'top-navbar':           { radius: '14px', wrap: '1240px', header: 'position:sticky;top:12px;margin:0 16px;border-radius:16px;border:1px solid var(--border);' },
    'glassmorphism-glow':   { radius: '18px', wrap: '1200px', card: 'background:color-mix(in srgb,var(--surface) 72%,transparent);backdrop-filter:blur(18px);border-color:color-mix(in srgb,var(--primary) 22%,transparent);', header: 'background:color-mix(in srgb,var(--surface) 55%,transparent);backdrop-filter:blur(20px);' },
    'brutalist-minimal':    { radius: '0px',  wrap: '1320px', card: 'border:2px solid var(--text);box-shadow:6px 6px 0 var(--text);', header: 'border-bottom:3px solid var(--text);' },
    'floating-island':      { radius: '20px', wrap: '1160px', card: 'box-shadow:0 18px 44px rgba(0,0,0,.45);transform:translateY(0);transition:transform .2s;', cardHover: 'transform:translateY(-3px);' },
    'split-executive':      { radius: '10px', wrap: '1400px', card: 'border-left:4px solid var(--primary);' },
    'terminal-developer':   { radius: '6px',  wrap: '1080px', card: 'font-size:13.5px;padding:18px;', header: 'font-family:ui-monospace,Consolas,monospace;' },
    'tabbed-focus':         { radius: '12px', wrap: '1000px', card: 'border-top:3px solid var(--accent);' },
    'academic-broadsheet':  { radius: '4px',  wrap: '1360px', card: 'border:1px solid var(--border-light);box-shadow:none;', header: 'background:var(--bg);' },
    'mobile-drawer-app':    { radius: '16px', wrap: '860px',  card: 'padding:18px;' },
    'dashboard-grid':       { radius: '12px', wrap: '1440px', card: 'padding:20px;' },
    'cinema-wide':          { radius: '14px', wrap: '1720px' },
    'stacked-feed':         { radius: '16px', wrap: '760px' },
    'zen-distraction-free': { radius: '12px', wrap: '720px',  card: 'box-shadow:none;border:none;background:transparent;padding:28px 8px;' },
    'sidebar-right':        { radius: '14px', wrap: '1280px', card: 'border-right:4px solid var(--accent);' },
    'compact-kiosk':        { radius: '8px',  wrap: '1020px', card: 'padding:14px;margin-bottom:12px;' },
    'stepper-wizard':       { radius: '14px', wrap: '920px',  card: 'border-top:3px solid var(--primary);' },
    'cards-masonry':        { radius: '16px', wrap: '1280px', card: 'margin-bottom:14px;' },
    'dock-bottom':          { radius: '18px', wrap: '1120px', header: 'position:fixed;bottom:0;top:auto;border-radius:18px 18px 0 0;border-bottom:none;margin:0 12px;' },
    'dual-pane-review':     { radius: '10px', wrap: '1500px', card: 'border-left:1px solid var(--border);border-right:1px solid var(--border);' },
    'magazine-editorial':   { radius: '0px',  wrap: '1180px', card: 'border:none;border-top:3px double var(--text-muted);box-shadow:none;padding:28px 6px;', header: 'border-bottom:1px solid var(--text-muted);text-transform:uppercase;letter-spacing:2px;' },
    'corporate-trust':      { radius: '8px',  wrap: '1260px', card: 'border-top:4px solid var(--primary);box-shadow:0 2px 10px rgba(0,0,0,.18);' },
    'ivory-league':         { radius: '6px',  wrap: '1140px', card: 'border:1px solid var(--border-light);box-shadow:0 6px 22px rgba(0,0,0,.22);', header: 'border-bottom:2px solid var(--accent);' },
    'soft-neumorphic':      { radius: '22px', wrap: '1180px', card: 'box-shadow:8px 8px 20px rgba(0,0,0,.45),-6px -6px 16px rgba(255,255,255,.03);border:none;' },
    'claymorphism':         { radius: '26px', wrap: '1120px', card: 'border:2px solid rgba(255,255,255,.06);box-shadow:inset 0 -8px 16px rgba(0,0,0,.28),0 14px 30px rgba(0,0,0,.35);' },
    'aurora-gradient':      { radius: '18px', wrap: '1240px', bg: 'radial-gradient(900px 420px at 12% -8%,color-mix(in srgb,var(--primary) 24%,transparent),transparent 60%),radial-gradient(800px 400px at 88% -12%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 60%),var(--bg)', card: 'backdrop-filter:blur(6px);' },
    'midnight-observatory': { radius: '16px', wrap: '1200px', bg: 'radial-gradient(1200px 600px at 50% -20%,color-mix(in srgb,var(--info) 14%,transparent),transparent 70%),var(--bg)', card: 'box-shadow:0 0 0 1px var(--border),0 24px 60px rgba(0,0,0,.5);' },
    'heritage-parchment':   { radius: '4px',  wrap: '1100px', card: 'border:1px solid color-mix(in srgb,var(--warning) 35%,var(--border));box-shadow:none;', header: 'border-bottom:2px solid color-mix(in srgb,var(--warning) 45%,transparent);' },
    'scandi-air':           { radius: '14px', wrap: '1060px', card: 'box-shadow:none;padding:32px;' },
    'swiss-grid':           { radius: '0px',  wrap: '1300px', card: 'border:1px solid var(--text);box-shadow:none;padding:20px;', header: 'border-bottom:2px solid var(--text);' },
    'bento-box':            { radius: '20px', wrap: '1320px', card: 'padding:18px;margin-bottom:12px;border-radius:22px;' },
    'newspaper-broadsheet': { radius: '0px',  wrap: '1380px', card: 'border:1px solid var(--border-light);box-shadow:none;padding:20px 24px;', header: 'border-bottom:4px double var(--text-muted);' },
    'terminal-amber':       { radius: '6px',  wrap: '1060px', card: 'border:1px solid color-mix(in srgb,var(--warning) 40%,transparent);', header: 'background:#120c02;border-bottom:1px solid var(--warning);' },
    'blueprint-draft':      { radius: '2px',  wrap: '1240px', bg: 'repeating-linear-gradient(0deg,transparent 0 31px,color-mix(in srgb,var(--info) 7%,transparent) 31px 32px),var(--bg)', card: 'border:1px dashed color-mix(in srgb,var(--info) 55%,transparent);' },
    'gallery-museum':       { radius: '12px', wrap: '1160px', card: 'padding:34px;box-shadow:0 30px 70px rgba(0,0,0,.5);border:none;' },
    'focus-spotlight':      { radius: '14px', wrap: '900px',  card: 'box-shadow:0 0 0 1px var(--border),0 0 60px color-mix(in srgb,var(--primary) 12%,transparent);' },
    'calm-study-hall':      { radius: '12px', wrap: '1080px', card: 'padding:26px;box-shadow:none;border-color:color-mix(in srgb,var(--text-muted) 25%,var(--border));' },
    'vivid-classroom':      { radius: '18px', wrap: '1200px', card: 'border-top:4px solid var(--accent);box-shadow:0 10px 30px rgba(0,0,0,.3);' },
    'mono-resume':          { radius: '6px',  wrap: '1000px', card: 'border-left:3px solid var(--text);box-shadow:none;padding:22px;' },
    'eco-botanical':        { radius: '16px', wrap: '1120px', card: 'border:1px solid color-mix(in srgb,var(--primary) 30%,var(--border));', header: 'border-bottom:2px solid color-mix(in srgb,var(--primary) 40%,transparent);' },
    'fintech-dashboard':    { radius: '14px', wrap: '1440px', card: 'box-shadow:0 1px 0 var(--border),0 8px 24px rgba(0,0,0,.25);border-top:2px solid var(--primary);' },
    'startup-launch':      { radius: '20px', wrap: '1180px', bg: 'linear-gradient(180deg,color-mix(in srgb,var(--primary) 8%,transparent),transparent 30%),var(--bg)', card: 'border:1px solid color-mix(in srgb,var(--primary) 20%,var(--border));' },
    'exam-hall-formal':     { radius: '4px',  wrap: '1220px', card: 'border:1px solid var(--border);box-shadow:none;padding:22px;', header: 'background:var(--surface-2);' },
    'library-index':        { radius: '8px',  wrap: '1140px', card: 'border-left:4px solid var(--warning);box-shadow:none;' },
    'gridlock-data':        { radius: '8px',  wrap: '1560px', card: 'padding:16px;margin-bottom:12px;font-size:13px;' },
    'ribbon-banner':        { radius: '16px', wrap: '1200px', card: 'border-top:5px solid var(--accent);box-shadow:0 14px 34px rgba(0,0,0,.32);' },
    'geometric-bauhaus':    { radius: '0px',  wrap: '1260px', card: 'border:3px solid var(--primary);box-shadow:8px 8px 0 var(--accent);' },
    'typewriter-script':    { radius: '2px',  wrap: '940px',  card: 'font-family:ui-monospace,Consolas,monospace;border:1px solid var(--border-light);box-shadow:none;', header: 'border-bottom:1px dashed var(--text-muted);' },
    'neon-outline':         { radius: '12px', wrap: '1220px', card: 'border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);box-shadow:0 0 24px color-mix(in srgb,var(--accent) 25%,transparent);' },
    'accessible-large':     { radius: '10px', wrap: '1040px', card: 'padding:30px;font-size:16px;', header: 'font-size:17px;' }
  },

  layoutCSS(cfg) {
    const L = this.LAYOUT_CSS[cfg.layoutId] || this.LAYOUT_CSS['classic-sidebar'] || {};
    const parts = [];
    const vars = [];
    if (L.radius) { vars.push(`--radius:${L.radius};--radius-sm:calc(${L.radius} * .6);--radius-lg:calc(${L.radius} * 1.4);`); }
    if (L.wrap) vars.push(`--layout-max:${L.wrap};`);
    if (vars.length) parts.push(`:root{${vars.join('')}}`);
    if (L.wrap) parts.push(`.main-wrap{max-width:${L.wrap};}`);
    if (L.header) parts.push(`.app-header{${L.header}}`);
    if (L.card) parts.push(`.card{${L.card}}`);
    if (L.cardHover) parts.push(`.card:hover{${L.cardHover}}`);
    if (L.bg) parts.push(`body{background:${L.bg};}`);
    return parts.length ? `\n\n/* ==== LAYOUT LAYER — "${cfg.layoutId}" (CBT System Generator) ==== */\n` + parts.join('\n') + '\n' : '';
  },

  applyThemeToCSS(css, cfg) {
    let out = css;
    const theme = this.THEMES.find(t => t.id === cfg.themeId) || {};
    const bg = cfg.bgColor || theme.bg || '#09090b';
    const surface = cfg.surfaceColor || theme.surface || '#18181b';
    const font = this.FONTS.find(f => f.id === cfg.fontId);
    const setVar = (cssText, name, value) => cssText.replace(
      new RegExp(`(--${name}:\\s*)[^;]+;`), `$1${value};`);
    out = setVar(out, 'primary', cfg.primaryColor);
    out = setVar(out, 'accent', cfg.accentColor);
    out = setVar(out, 'primary-dim', hexToRgba(cfg.primaryColor, 0.12));
    out = setVar(out, 'accent-dim', hexToRgba(cfg.accentColor, 0.12));
    out = setVar(out, 'primary-hover', shade(cfg.primaryColor, -12));
    out = setVar(out, 'bg', bg);
    out = setVar(out, 'surface', surface);
    if (font) {
      out = out.replace(/font-family:\s*['"]?Plus Jakarta Sans['"]?[^;]+;/,
        `font-family: ${font.family};`);
    }
    return out;

    function hexToRgba(hex, a) {
      const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
      if (!m) return `rgba(16,185,129,${a})`;
      const n = parseInt(m[1], 16);
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
    }
    function shade(hex, pct) {
      const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
      if (!m) return hex;
      const n = parseInt(m[1], 16);
      const f = (v) => Math.max(0, Math.min(255, Math.round(v * (100 + pct) / 100)));
      return '#' + [f((n >> 16) & 255), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
    }
  },

  /* Bake the whitelabel license + brand config so site-license.js and the
     pages pick it up without editing any file by hand. */
  brandConfigSnippet(cfg) {
    const lic = {
      model: cfg.licenseModel === 'subscription' ? 'subscription' : 'lifetime',
      cycle: cfg.licenseCycle || '',
      expires_on: cfg.licenseExpires || null,
      grace_days: Number(cfg.licenseGraceDays) || 7,
      plan: cfg.licenseModel === 'subscription' ? `${cfg.institutionName} subscription` : 'One-time purchase (lifetime ownership)',
      renew_url: '',
      registry: cfg.licenseRegistryUrl || '',
      salt: cfg.licenseSalt || 'HMG_CBT_PRO_V10_SECURE_SALT_2026',
      slug: cfg.institutionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
      name: cfg.institutionName,
      tagline: cfg.tagline,
      supportEmail: cfg.supportEmail,
      supportPhone: cfg.supportPhone,
      defaultPassmark: Number(cfg.defaultPassmark) || 50
    };
    return `\n\n/* ==== BAKED BY THE CBT SYSTEM GENERATOR — ${new Date().toISOString()} ====\n   Whitelabel brand + license config. Edit here or from Settings/License pages. */\nwindow.CBT_LICENSE = ${JSON.stringify(lic, null, 2)};\nwindow.CBT_BRAND = window.CBT_LICENSE;\n`;
  },

  /* Client-specific quick-start generated into every package. */
  clientReadme(cfg) {
    return `# ${cfg.institutionName} — CBT Platform (Generated Package)

Generated by the HMG CBT System Generator on ${new Date().toISOString()}.

This ZIP is a COMPLETE, deployable platform. Nothing else is needed.

## 5-minute launch

1. **Unzip** this file.
2. **Database (once):** create a free project at [supabase.com](https://supabase.com),
   open **SQL Editor**, paste the whole of **database/complete-schema.sql** and Run —
   that single file is all-inclusive (10 tables, 41+ RPCs, RLS, indexes, storage
   bucket, keep-alive, seeds) and safe to run many times. The other files in
   **database/** are optional maintenance extracts (see database/README.md).
3. **Deploy free (pick one):**
   - **Vercel:** [vercel.com/new](https://vercel.com/new) → import the folder/repo → Deploy
     (keeps the /api/keepalive function + cron).
   - **GitHub Pages:** push to a repo → Settings → Pages → deploy from branch.
4. **First login:** open the site → create an account — the FIRST account is
   automatically the super_admin.
5. **Free-tier protection (strongly recommended, 5 min once):** follow
   **SUPABASE_FREE_TIER_PROTECTION.md** — add the two GitHub secrets so your
   database is never paused for inactivity.

## What is inside

- 3 portals (student / teacher / admin) + multi-subject CBT + AI prompt studio (24 packs)
- 20 question types (dedicated question-types.html reference included), proctoring & anti-cheat, certificates with verification
- Settings console (branding, CBT defaults, accessibility, security, ACL)
- Admin Data (backups, Drive sync, dry-run restores, disaster recovery)
- Storage Manager (real table sizes, Archive Vault, archive-first purging)
- Platform Health (verified 10-layer protection matrix + security posture grade)
- Roles & Status manager, Audit log with retention, Site license (dual engine)

## Support

${cfg.supportEmail} · ${cfg.supportPhone}

Powered by the HMG Academy Ecosystem.
`;
  },

  /* ═══════════════ MAIN ENTRY ═══════════════ */
  async generatePackage(customConfig, onProgress) {
    const cfg = Object.assign({}, this.defaultConfig, customConfig || {});
    if (!cfg.institutionName || cfg.institutionName.trim().length < 2) {
      throw new Error('Enter an institution name first.');
    }
    if (!cfg.supabaseUrl || !cfg.supabaseUrl.trim()) {
      throw new Error('Enter the CLIENT\'s Supabase project URL first (Supabase → Settings → API).');
    }
    if (!cfg.supabaseUrl.startsWith('https://')) {
      throw new Error('Supabase URL must start with https:// (get it from Supabase → Settings → API).');
    }
    if (!cfg.supabaseAnonKey.startsWith('eyJ')) {
      throw new Error('Supabase key must be the anon/public key (it starts with eyJ...). NEVER put the service_role key in a browser.');
    }

    const report = k => { if (typeof onProgress === 'function') onProgress(k); };

    // Load JSZip lazily
    if (!window.JSZip) {
      report('Loading packaging library…');
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
        s.onload = resolve;
        s.onerror = () => reject(new Error('Could not load JSZip from CDN — check your connection.'));
        document.head.appendChild(s);
      });
    }

    const zip = new JSZip();
    const manifest = this.MANIFEST;
    const allTextFiles = [
      ...manifest.pages, ...manifest.scripts, ...manifest.styles,
      ...manifest.docs, ...manifest.infra, ...manifest.data
    ];
    const binaryFiles = [...manifest.images];
    const expected = new Set([...allTextFiles, ...binaryFiles]);
    const missing = [], included = [];

    /* 1. Text files — fetched from templates/ and branded. NO silent failures:
          every missing file is recorded and reported at the end. Fetched from
          templates/<file>, zipped as <file> so the client ZIP never contains
          a templates/ folder or any generator files. */
    for (const file of allTextFiles) {
      report(`Packaging ${file}…`);
      try {
        let text = this.applyClientMode(await this.fetchText(this.TEMPLATE_PREFIX + file));
        if (file === 'assets/css/style.css') {
          text = this.applyThemeToCSS(text, cfg) + this.layoutCSS(cfg);
        } else if (file === 'assets/js/app.js') {
          text = this.brandText(text, cfg) + this.brandConfigSnippet(cfg);
        } else if (file === 'manifest.webmanifest') {
          text = this.brandManifest(text, cfg);
        } else if (file === 'sw.js') {
          text = this.brandSW(this.brandText(text, cfg), cfg);
        } else if (file === 'sitemap.xml' || file === 'robots.txt') {
          text = this.brandSitemapRobots(text, cfg);
        } else if (file.endsWith('.html')) {
          text = this.brandHtmlHead(this.brandSeo(this.brandText(text, cfg), cfg), cfg);
        } else {
          /* every other text file (docs, sql, yml, xml, headers) gets the same
             credential + SEO passes — a token in ANY file must resolve, never ship */
          text = this.brandSeo(this.brandText(text, cfg), cfg);
        }
        /* HARD LEAK SCAN — the client's package must never carry the builder's
           Supabase credentials (or an unresolved placeholder token). */
        const leak = /pstnsaqjshmtintjrnas\.supabase\.co|KNVgpVN0xp1njin1HL3udntc7psfzjnz7mqzpEN_Z6w|__CLIENT_SUPABASE_(URL|KEY)__|__CLIENT_SITE_URL__/.test(text);
        if (leak) {
          throw new Error('credential leak detected — file still contains builder credentials or an unresolved placeholder');
        }
        zip.file(file, text);
        included.push(file);
      } catch (e) {
        missing.push({ file, critical: this.CRITICAL.has(file), error: e.message });
      }
    }

    /* 2. Binary files (logos, sample images) — copied verbatim from templates/ */
    for (const file of binaryFiles) {
      try {
        zip.file(file, await this.fetchBinary(this.TEMPLATE_PREFIX + file));
        included.push(file);
      } catch (e) {
        missing.push({ file, critical: this.CRITICAL.has(file), error: e.message });
      }
    }

    /* 3. Client-specific quick-start README */
    zip.file('START-HERE.md', this.clientReadme(cfg));
    included.push('START-HERE.md');

    /* 4. Abort if anything critical is missing — a broken package is
          worse than an honest error. */
    const criticalMissing = missing.filter(m => m.critical);
    if (criticalMissing.length) {
      throw new Error('CRITICAL files could not be fetched — the package would be broken: ' +
        criticalMissing.map(m => `${m.file} (${m.error})`).join(', ') +
        '. Is the generator deployed (not opened as a local file)? Refresh and try again.');
    }

    /* 5. Generate + self-verify: reopen the produced ZIP and confirm every
          expected file is actually present inside it. */
    report('Compressing package…');
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });

    report('Verifying package integrity…');
    const checkZip = await JSZip.loadAsync(blob);
    const absent = [...expected].filter(f => !checkZip.file(f));
    if (absent.length) {
      throw new Error('Integrity check failed — these files are missing from the produced ZIP: ' + absent.join(', '));
    }

    /* 6. Download */
    const slug = cfg.institutionName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${slug}-cbt-enterprise-package.zip`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);

    return {
      success: true,
      filename,
      sizeBytes: blob.size,
      filesIncluded: included.length,
      filesExpected: expected.size + 1,
      missingNonCritical: missing,
      verified: true
    };
  }
};

window.CBTGenerator = CBTGenerator;
