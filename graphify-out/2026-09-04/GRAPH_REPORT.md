# Graph Report - GloSim  (2026-08-25)

## Corpus Check
- 78 files · ~42,839 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 467 nodes · 733 edges · 48 communities (43 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App.tsx
- support.js
- contentTypes.d.ts
- ImageSlot
- frontend/package.json
- Website Design Plan
- compilerOptions
- dependencies
- scripts
- 2. Quickstart Guide (Local Development)
- Global Simulation Conference — Design System
- compilerOptions
- index.js
- 2. Deploying on VPS (Step-by-Step)
- vite-env.d.ts
- rules/graphify.md
- workflows/graphify.md
- database.js
- server.js
- backend/package.json
- components.d.ts

## God Nodes (most connected - your core abstractions)
1. `ImageSlot` - 27 edges
2. `Locale` - 27 edges
3. `get()` - 23 edges
4. `createRuntime()` - 22 edges
5. `compilerOptions` - 17 edges
6. `boot()` - 12 edges
7. `ApiService` - 12 edges
8. `Conference` - 12 edges
9. `scripts` - 10 edges
10. `Website Design Plan` - 10 edges

## Surprising Connections (you probably didn't know these)
- `CountdownBannerProps` --references--> `Conference`  [EXTRACTED]
  frontend/src/components/CountdownBanner.tsx → frontend/src/types/index.ts
- `RegisterModalProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/RegisterModal.tsx → frontend/src/types/index.ts
- `bootstrap()` --calls--> `seedDatabase()`  [EXTRACTED]
  backend/src/index.js → backend/src/bootstrap-seed.js
- `FooterProps` --references--> `GlobalSettings`  [EXTRACTED]
  frontend/src/components/Footer.tsx → frontend/src/types/index.ts
- `FooterProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/Footer.tsx → frontend/src/types/index.ts

## Import Cycles
- None detected.

## Communities (48 total, 5 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.09
Nodes (38): App(), CountdownBanner(), CountdownBannerProps, Footer(), FooterProps, Header(), HeaderProps, RegisterModal() (+30 more)

### Community 1 - "support.js"
Cohesion: 0.06
Nodes (75): boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+67 more)

### Community 2 - "contentTypes.d.ts"
Cohesion: 0.08
Nodes (25): AdminApiToken, AdminApiTokenPermission, AdminPermission, AdminRole, AdminTransferToken, AdminTransferTokenPermission, AdminUser, ApiConferenceConference (+17 more)

### Community 3 - "ImageSlot"
Cohesion: 0.13
Nodes (7): flushNow(), getSlot(), ImageSlot, load(), save(), setSlot(), toDataUrl()

### Community 4 - "frontend/package.json"
Cohesion: 0.07
Nodes (26): dependencies, lucide-react, react, react-dom, devDependencies, @types/react, @types/react-dom, typescript (+18 more)

### Community 5 - "Website Design Plan"
Cohesion: 0.08
Nodes (25): 1. Global (Single Type) — Site-wide Settings, 1. Home, 1. Project Overview, 2. HomePage (Single Type), 2. Information Architecture (Sitemap), 2. Organization, 3. Conference Schedule, 3. OrgOverview (Single Type) (+17 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+15 more)

### Community 7 - "dependencies"
Cohesion: 0.07
Nodes (29): ajv, dependencies, ajv, better-sqlite3, date-fns, date-fns-tz, dotenv, pg (+21 more)

### Community 8 - "scripts"
Cohesion: 0.07
Nodes (29): concurrently, description, devDependencies, concurrently, date-fns, date-fns-tz, date-fns, date-fns-tz (+21 more)

### Community 10 - "2. Quickstart Guide (Local Development)"
Cohesion: 0.25
Nodes (7): 1. Project Directory Structure, 2. Quickstart Guide (Local Development), 3. Production VPS Deployment (Prebuilt Artifacts), GloSim (Global Simulation Conference), Step 1: Install Dependencies, Step 2: Run Frontend Development Server, Step 3: Run Strapi CMS Backend (SQLite)

### Community 11 - "Global Simulation Conference — Design System"
Cohesion: 0.22
Nodes (8): Content fundamentals, Global Simulation Conference — Design System, Iconography, Index, Intentional additions, Overview, Sources, Visual foundations

### Community 12 - "compilerOptions"
Cohesion: 0.22
Nodes (8): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include, vite.config.ts

### Community 13 - "index.js"
Cohesion: 0.38
Nodes (4): seedData, seedDatabase(), bootstrap(), { seedDatabase }

### Community 14 - "2. Deploying on VPS (Step-by-Step)"
Cohesion: 0.22
Nodes (8): 1. Directory Structure in Deployment Package, 2. Deploying on VPS (Step-by-Step), 3. GitHub Actions Continuous Integration, GloSim Deployment & VPS Architecture Guide, Step 1: Download & Extract Prebuilt Artifact, Step 2: Configure `.env`, Step 3: Launch Containers, Step 4: Verify Deployment

### Community 46 - "backend/package.json"
Cohesion: 0.13
Nodes (14): description, license, name, overrides, ajv, better-sqlite3, sharp, private (+6 more)

### Community 47 - "components.d.ts"
Cohesion: 0.22
Nodes (8): Components, ConferenceAgendaItem, ConferenceSpeakerItem, HomeHighlightItem, Shared, SharedNavItem, SharedSocialLink, @strapi/types

## Knowledge Gaps
- **174 isolated node(s):** `path`, `path`, `dotenv`, `name`, `version` (+169 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `backend/package.json`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `createRuntime()` (e.g. with `adoptParsed()` and `dcUpdate()`) actually correct?**
  _`createRuntime()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `path`, `path`, `dotenv` to the rest of the system?**
  _174 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09044289044289044 - nodes in this community are weakly interconnected._
- **Should `support.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060678962844159315 - nodes in this community are weakly interconnected._
- **Should `contentTypes.d.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `ImageSlot` be split into smaller, more focused modules?**
  _Cohesion score 0.1319073083778966 - nodes in this community are weakly interconnected._