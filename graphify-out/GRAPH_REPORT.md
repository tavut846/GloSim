# Graph Report - GloSim  (2026-09-08)

## Corpus Check
- 90 files · ~354,846 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 573 nodes · 899 edges · 65 communities (52 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8845594b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Locale
- support.js
- contentTypes.d.ts
- ImageSlot
- devDependencies
- Website Design Plan
- compilerOptions
- dependencies
- scripts
- GloSim (Global Simulation Conference)
- Global Simulation Conference — Design System
- compilerOptions
- index.js
- 2. Deploying on VPS (Step-by-Step)
- vite-env.d.ts
- rules/graphify.md
- workflows/graphify.md
- database.js
- server.js
- glosim-deploy.sh
- components.d.ts
- resolve-version.js
- GloSim 0.0.1-pre-1
- bump-version.js
- backend/server.js
- optionalDependencies
- backend/package.json
- scripts
- date-fns
- date-fns-tz
- ajv
- react
- react-dom
- @strapi/plugin-users-permissions
- @strapi/strapi

## God Nodes (most connected - your core abstractions)
1. `Locale` - 37 edges
2. `ImageSlot` - 27 edges
3. `get()` - 23 edges
4. `createRuntime()` - 22 edges
5. `compilerOptions` - 17 edges
6. `boot()` - 12 edges
7. `ApiService` - 12 edges
8. `Conference` - 12 edges
9. `scripts` - 12 edges
10. `deploy_services()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ConferenceHeroProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/ConferenceHero.tsx → frontend/src/types/index.ts
- `HeroHeaderProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/HeroHeader.tsx → frontend/src/types/index.ts
- `RegisterModalProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/RegisterModal.tsx → frontend/src/types/index.ts
- `WelcomeAddressProps` --references--> `Locale`  [EXTRACTED]
  frontend/src/components/WelcomeAddress.tsx → frontend/src/types/index.ts
- `bootstrap()` --calls--> `seedDatabase()`  [EXTRACTED]
  backend/src/index.js → backend/src/bootstrap-seed.js

## Import Cycles
- None detected.

## Communities (65 total, 13 thin omitted)

### Community 0 - "Locale"
Cohesion: 0.07
Nodes (51): App(), ConferenceHero(), ConferenceHeroProps, Hero, CountdownBanner(), CountdownBannerProps, Footer(), FooterProps (+43 more)

### Community 1 - "support.js"
Cohesion: 0.06
Nodes (75): boot(), bundledBlob(), cdnScriptFor(), collectProps(), compileAttr(), compileTemplate(), contentKey(), createComponentFactory() (+67 more)

### Community 2 - "contentTypes.d.ts"
Cohesion: 0.08
Nodes (25): AdminApiToken, AdminApiTokenPermission, AdminPermission, AdminRole, AdminTransferToken, AdminTransferTokenPermission, AdminUser, ApiConferenceConference (+17 more)

### Community 3 - "ImageSlot"
Cohesion: 0.13
Nodes (7): flushNow(), getSlot(), ImageSlot, load(), save(), setSlot(), toDataUrl()

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (32): autoprefixer, dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, postcss (+24 more)

### Community 5 - "Website Design Plan"
Cohesion: 0.08
Nodes (25): 1. Global (Single Type) — Site-wide Settings, 1. Home, 1. Project Overview, 2. HomePage (Single Type), 2. Information Architecture (Sitemap), 2. Organization, 3. Conference Schedule, 3. OrgOverview (Single Type) (+17 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+15 more)

### Community 7 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, better-sqlite3, dotenv, pg, react-router-dom, sharp, @strapi/plugin-i18n, styled-components (+7 more)

### Community 8 - "scripts"
Cohesion: 0.06
Nodes (31): concurrently, description, devDependencies, concurrently, date-fns, date-fns-tz, date-fns, date-fns-tz (+23 more)

### Community 10 - "GloSim (Global Simulation Conference)"
Cohesion: 0.07
Nodes (27): 10. Automated Versioning & Pre-Release Pipeline, 1. Code Directory Structure (Repository Code), 1. Versioning Specification, 2. Artifact Code Structure (Deployment Package), 2. Automated Release Notes Generation, 3. Local Version Management Commands, 3. Project Structure & Technical Capabilities, 4. Quickstart Guide (Local Development) (+19 more)

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
Cohesion: 0.18
Nodes (10): 1. Directory Structure in Deployment Package, 2. Deploying on VPS (Step-by-Step), 3. GitHub Actions Continuous Integration, Alternative: Manual Download & Extraction, GloSim Deployment & VPS Architecture Guide, 🚀 One-Command Instant Deploy (Recommended), Step 2: Launch Containers, Step 3: (Optional) Configure External PostgreSQL (+2 more)

### Community 46 - "glosim-deploy.sh"
Cohesion: 0.39
Nodes (15): add_glosim_command(), check_docker(), deploy_services(), download_and_extract_release(), error(), info(), remove_logs(), glosim-deploy.sh script (+7 more)

### Community 47 - "components.d.ts"
Cohesion: 0.20
Nodes (9): Components, ConferenceAgendaItem, ConferenceSpeakerItem, HomeGuestItem, HomeHighlightItem, Shared, SharedNavItem, SharedSocialLink (+1 more)

### Community 48 - "resolve-version.js"
Cohesion: 0.15
Nodes (11): { execSync }, features, fixes, fs, improvements, notesPath, others, path (+3 more)

### Community 49 - "GloSim 0.0.1-pre-1"
Cohesion: 0.29
Nodes (6): 📦 Artifact Highlights, GloSim 0.0.1-pre-1, 🔧 Maintenance & Documentation, ✨ New Features, ⚡ Quick Deployment Instructions, 🚀 What's New & Feature Highlights

### Community 50 - "bump-version.js"
Cohesion: 0.40
Nodes (4): filesToUpdate, fs, path, rootDir

### Community 52 - "optionalDependencies"
Cohesion: 0.22
Nodes (9): optionalDependencies, @img/sharp-libvips-linux-arm64, @img/sharp-libvips-linux-x64, @img/sharp-linux-arm64, @img/sharp-linux-x64, @img/sharp-libvips-linux-arm64, @img/sharp-libvips-linux-x64, @img/sharp-linux-arm64 (+1 more)

### Community 53 - "backend/package.json"
Cohesion: 0.20
Nodes (9): description, license, name, overrides, ajv, better-sqlite3, sharp, private (+1 more)

### Community 57 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, develop, start, strapi

## Knowledge Gaps
- **225 isolated node(s):** `path`, `path`, `dotenv`, `name`, `version` (+220 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@strapi/strapi`, `backend/package.json`, `date-fns`, `date-fns-tz`, `ajv`, `react`, `react-dom`, `@strapi/plugin-users-permissions`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `createRuntime()` (e.g. with `adoptParsed()` and `dcUpdate()`) actually correct?**
  _`createRuntime()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `path`, `path`, `dotenv` to the rest of the system?**
  _225 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Locale` be split into smaller, more focused modules?**
  _Cohesion score 0.06758742286218043 - nodes in this community are weakly interconnected._
- **Should `support.js` be split into smaller, more focused modules?**
  _Cohesion score 0.060678962844159315 - nodes in this community are weakly interconnected._
- **Should `contentTypes.d.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `ImageSlot` be split into smaller, more focused modules?**
  _Cohesion score 0.1319073083778966 - nodes in this community are weakly interconnected._