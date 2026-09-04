# GloSim (Global Simulation Conference)

> **Bilingual Multi-Page Academic Conference Platform & Headless CMS**  
> Chinese (简体中文) & English (English) · Strapi Headless CMS · React / Vite Frontend · Docker VPS Deployment

---

## 1. Code Directory Structure (Repository Code)

The development repository is organized as an npm workspace containing the Strapi backend CMS, the React frontend application, containerization definitions, and CI/CD pipelines:

```
GloSim/
├── .github/
│   └── workflows/
│       └── build-deploy-artifact.yml # Automated CI/CD: builds frontend/backend, packages bundle, publishes Pre-Release
│
├── backend/                          # Strapi v4 Headless CMS (Node.js 20)
│   ├── config/                       # Server, database (SQLite/PostgreSQL dynamic switch), admin, plugins, CORS
│   │   ├── admin.js
│   │   ├── api.js
│   │   ├── database.js               # Dynamic DB resolver (SQLite for dev, PostgreSQL for production)
│   │   ├── middlewares.js            # Security, CORS, logger, body parser middleware
│   │   ├── plugins.js                # i18n and Users-Permissions configuration
│   │   └── server.js
│   ├── src/
│   │   ├── api/                      # 7 Localized Content-Types (Single & Collection Types)
│   │   │   ├── conference/           # Conference event data, schedule dates, registration config
│   │   │   ├── global/               # Global site settings (bilingual site title, ICP record, contact, nav)
│   │   │   ├── home-page/            # Homepage hero carousel, stats, call-to-actions
│   │   │   ├── leader/               # Academic committee leaders, chairs, biographies, avatars
│   │   │   ├── member-institution/   # Participating universities and research institution directory
│   │   │   ├── notice/               # Conference announcements, call for papers, news updates
│   │   │   └── org-overview/         # Organization overview, mission, bylaws, leadership structure
│   │   ├── components/               # Repeatable Strapi UI Components
│   │   │   ├── conference/           # agenda-item, speaker-item
│   │   │   ├── home/                 # highlight-item
│   │   │   └── shared/               # nav-item, social-link
│   │   ├── bootstrap-seed.js         # Automated idempotent DB seed (bilingual content & public permissions)
│   │   └── index.js                  # Strapi lifecycle bootstrap hook
│   ├── database/                     # Migrations & database schemas
│   ├── public/                       # Uploaded conference assets & media files
│   ├── server.js                     # Programmatic Strapi server entry point
│   └── package.json                  # Backend dependencies & Strapi scripts
│
├── frontend/                         # Modern React 18 Single Page Application (SPA)
│   ├── public/                       # Static public assets (favicons, logos)
│   ├── src/
│   │   ├── components/               # Reusable UI & Layout Components
│   │   │   ├── CountdownBanner.tsx   # Live conference countdown banner with days/hours/mins/secs
│   │   │   ├── Footer.tsx            # Bilingual footer with dynamic nav links, copyright, ICP info
│   │   │   ├── Header.tsx            # Responsive navigation bar with language switcher & mobile menu
│   │   │   ├── RegisterModal.tsx     # Conference attendee registration modal with form validation
│   │   │   └── VideoModal.tsx        # Video player modal for keynote & conference previews
│   │   ├── pages/                    # 5 Core Conference Pages
│   │   │   ├── AboutPage.tsx         # Organization overview, committee members & institution list
│   │   │   ├── CallForPapersPage.tsx # CFP topics, submission timeline, formatting requirements
│   │   │   ├── HomePage.tsx          # Hero carousel, event highlights, countdown, latest notices
│   │   │   ├── PastConferencesPage.tsx # Archive of past conference proceedings & galleries
│   │   │   └── SchedulePage.tsx      # Multi-day conference schedule, tracks, and keynote sessions
│   │   ├── locales/                  # Bilingual Translation Dictionaries
│   │   │   ├── en.ts                 # English locale dictionary
│   │   │   └── zh.ts                 # Simplified Chinese locale dictionary
│   │   ├── services/
│   │   │   └── api.ts                # Centralized REST client with automatic fallback to static dictionaries
│   │   ├── styles/
│   │   │   ├── index.css             # Glassmorphism effects, responsive resets, utilities
│   │   │   └── tokens.css            # Design tokens (colors, typography, spacing, shadows)
│   │   ├── types/
│   │   │   └── index.ts              # Full TypeScript definitions for Strapi models & UI props
│   │   ├── App.tsx                   # Root component with client-side routing & locale state
│   │   ├── main.tsx                  # React DOM entry point
│   │   └── vite-env.d.ts             # Vite environment type definitions
│   ├── index.html                    # Single-page application HTML entry
│   ├── tsconfig.json                 # TypeScript compiler configuration
│   └── vite.config.ts                # Vite 5 build configuration
│
├── docker/                           # Production Docker Deployment Assets
│   ├── Dockerfile.backend            # Lightweight Node 20 Slim production runtime
│   ├── Dockerfile.frontend           # Lightweight Nginx Alpine web server for SPA
│   ├── docker-compose.yml            # Multi-container orchestration (Backend + Frontend)
│   ├── glosim-deploy.sh              # Interactive management & deployment CLI tool
│   └── nginx.conf                    # Nginx reverse proxy, SPA routing (`try_files`), Gzip compression
│
├── docs/                             # Architecture & Deployment Documentation
│   ├── deployment.md                 # VPS Deployment & external PostgreSQL guide
│   └── plan.md                       # Product requirement & information architecture plan
│
├── scripts/                          # Versioning & Release Automation Scripts
│   ├── bump-version.js               # Synchronizes version bumps across workspaces
│   └── resolve-version.js            # Computes pre-release tags (0.0.1-pre-n) & compiles release notes
│
├── .env.example                      # Unified environment variable template
├── package.json                      # Root workspace configuration & concurrent dev runners
└── README.md                         # Project documentation
```

---

## 2. Artifact Code Structure (Deployment Package)

When downloaded from GitHub Actions or the GitHub **Pre-Release** page (`glosim.zip`), the package is pre-assembled for zero-friction VPS deployment. All container orchestration files are positioned at the root level:

```
glosim/
├── docker-compose.yml                # Multi-container orchestration (Backend + Frontend services)
├── Dockerfile.backend                # Lightweight production runtime container for Strapi
├── Dockerfile.frontend               # Nginx Alpine web server container for static SPA assets
├── nginx.conf                        # Production Nginx SPA routing & Gzip compression config
├── .env                              # Pre-configured production config (ready with SQLite storage)
├── .env.example                      # Environment variables reference template
├── README.md                         # Deployment quickstart documentation
│
├── backend/                          # Prebuilt Strapi CMS Backend
│   ├── build/                        # Compiled Strapi Admin Dashboard static bundle
│   ├── config/                       # Production database, server, plugin, and security configs
│   ├── node_modules/                 # Production-only dependencies (pruned via `npm prune --production`)
│   ├── public/                       # Uploaded conference media & assets directory
│   ├── src/                          # Content-type schemas, component definitions, and seed scripts
│   ├── .tmp/                         # SQLite database storage directory (persisted volume)
│   ├── server.js                     # Direct Node entry point (avoids symlink issues)
│   └── package.json                  # Runtime package metadata
│
└── frontend/                         # Prebuilt React Frontend
    └── dist/                         # Optimized HTML, CSS, and JS static bundle
        ├── assets/                   # Minified and hashed JavaScript & CSS bundles
        └── index.html                # Production SPA entry point
```

---

## 3. Project Structure & Technical Capabilities

### Backend (Node.js & Strapi CMS Headless Architecture)

- **Solid Node.js & Strapi Core**: Headless CMS v4 architecture running on Node.js 20 LTS; asynchronous lifecycle hooks, unified middleware execution, and modular plugin extensions.
- **Content Modeling & Architecture**: 7 localized content types (Collection & Single Types) including `Conference`, `Global`, `HomePage`, `Leader`, `MemberInstitution`, `Notice`, and `OrgOverview`; coupled with reusable components (`AgendaItem`, `SpeakerItem`, `HomeHighlight`, `NavItem`, `SocialLink`).
- **Dual-Engine Persistence & Dynamic Switching**: Support for zero-configuration SQLite (`better-sqlite3`) for lightweight deployments and high-concurrency PostgreSQL (`pg`) for production database clusters; dynamic runtime resolution via environment variables.
- **Security, Access Control & API Design**: Granular Role-Based Access Control (RBAC) via `@strapi/plugin-users-permissions` with public read endpoints; centralized API token handling, CORS whitelist policy, and cryptographic secret hashing (`APP_KEYS`, `JWT_SECRET`, `API_TOKEN_SALT`).
- **Automated Seeding & Idempotence**: Automated bootstrap engine (`bootstrap-seed.js`) that provisions initial bilingual conference data and grants public API permissions on first startup without duplicate overhead.
- **Practical Projects & Modules**:
  - *Conference Management Module*: Bilingual conference metadata, registration dates, interactive agenda timeline, and keynote speaker directories.
  - *Organization & Leadership Module*: Academic leadership roster, executive committee bios, and member institution directory.
  - *Notices & Announcement Service*: Categorized academic notices, CFP deadline tracking, and document attachment distribution.
  - *Global Configuration Service*: Multi-language site metadata, ICP filing numbers, contact information, and dynamic navigation hierarchy.

### Frontend (React + TypeScript Modern SPA)

- **Modern React & TypeScript Foundation**: React 18 functional components, React Hooks (`useState`, `useEffect`, `useMemo`), strict TypeScript type definitions (`src/types/index.ts`), and Vite 5 rapid build tooling.
- **Bilingual Internationalization (i18n)**: Seamless English (`en`) and Simplified Chinese (`zh`) dual-locale state management, typed translation dictionaries (`locales/zh.ts`, `locales/en.ts`), and live fallback synchronization with Strapi localized API responses.
- **Design System & Visual Aesthetics**: Custom tokenized CSS system (`tokens.css`, `index.css`), modern responsive glassmorphism aesthetic, sleek gradients, accessibility-compliant typography, and Lucide React icon integration.
- **Component Architecture & Interactive UI**: Decoupled presentation components (`Header`, `Footer`, `CountdownBanner`, `RegisterModal`, `VideoModal`), reactive countdown timers, modal overlays, tabbed schedule filters, and responsive mobile navigation drawers.
- **Resilient Data Fetching & API Service Layer**: Centralized `ApiService` client with graceful offline fallback to static locale dictionaries when backend is disconnected.
- **Practical Projects & Modules**:
  - *Conference Portal Home Page*: Hero carousel, dynamic registration CTA, countdown banner, and highlights grid.
  - *Interactive Schedule & Agenda Viewer*: Multi-day session tracks, time slots, and speaker spotlight modal.
  - *Academic Organization & Governance Page*: Leadership team grid, organizational mission, and member institution directory.
  - *Call for Papers (CFP) & Author Submission Portal*: Topics list, key submission dates, and paper formatting guidelines.
  - *Past Conferences Archive*: Historical conference timelines, past proceedings, and event archives.

### DevOps & Infrastructure (Docker & CI/CD Pipeline)

- **Multi-Container Containerization**: Docker Compose orchestration uniting backend API and frontend web server under isolated bridge networks (`glosim-network`).
- **Production Web Server & Reverse Proxy**: Lightweight Nginx Alpine web server for frontend SPA routing (`try_files $uri $uri/ /index.html;`), asset caching, and Gzip compression.
- **Automated GitHub Actions CI/CD**: Matrix build pipeline (`.github/workflows/build-deploy-artifact.yml`) compiling frontend assets, building Strapi admin panels, pruning `devDependencies` (`npm prune --production`), assembling zero-friction deployable bundles, and publishing pre-release archives (`glosim.zip`).
- **Practical Projects & Modules**:
  - *Zero-Friction Single-VPS Deployment Suite*: One-step `docker compose up -d --build` with out-of-the-box SQLite or host PostgreSQL integration via `host.docker.internal`.
  - *Automated Build & Release Pipeline*: Automated ZIP bundling without nested archives, GitHub Pre-Release asset distribution.

---

## 4. Quickstart Guide (Local Development)

### Prerequisites
- **Node.js**: v18 or v20 LTS
- **npm**: v9 or higher

### Step 1: Install Dependencies
Install all workspace dependencies from the root directory:
```bash
npm install
```

### Step 2: Start Development Servers

You can start both frontend and backend concurrently, or launch them individually:

#### Option A: Run Both Concurrently (Recommended)
```bash
npm run dev:all
```

#### Option B: Run Individually
- **Frontend Server**:
  ```bash
  npm run dev:frontend
  ```
  Accessible at: **http://localhost:5173**

- **Strapi CMS Backend**:
  ```bash
  npm run dev:backend
  ```
  - Admin Panel: **http://localhost:1337/admin**
  - REST API Base: **http://localhost:1337/api**

> [!TIP]
> You can also press **`F5`** in VS Code to launch the full-stack debug configuration!

---

## 5. Production VPS Deployment (Prebuilt Artifacts)

### 🚀 One-Command Deploy (Pre-Release Version)

On any fresh Linux VPS (Ubuntu / Debian / CentOS / AlmaLinux), run this single command to automatically download the latest Pre-Release, set up SQLite storage, install the global `glosim` CLI, and launch all services:

```bash
curl -fsSL https://raw.githubusercontent.com/tavut846/GloSim/main/docker/glosim-deploy.sh | bash -s deploy
```

> [!TIP]
> After deployment completes, simply type **`glosim`** anywhere on your server to open the interactive management menu, check container status, view logs, or update to newer releases!

```text
====================================================
        GloSim Management & Deployment Tool        
        Repository: https://github.com/tavut846/GloSim
====================================================
 1) Add 'glosim' command to VPS (access from anywhere)
 2) Deploy / Start GloSim (docker compose up -d --build)
 3) Uninstall GloSim (database & uploaded media preserved)
 4) Clear Container Logs
 5) Update GloSim (Latest Pre-Release or Git Pull)
 6) View Platform & Container Status
 0) Exit
====================================================
```

---

### Step 1: Manual Download & Extract Prebuilt Bundle (Alternative)
If you prefer manual installation without the 1-command installer, download `glosim.zip` from GitHub **Pre-Releases**:
```bash
unzip glosim.zip -d /opt/glosim
cd /opt/glosim
```

### Step 2: Launch Containers
From the extracted bundle directory:
```bash
docker compose up -d --build
```

### Step 3: (Optional) Configure External PostgreSQL
The prebuilt bundle includes a `.env` file pre-configured for **SQLite** out-of-the-box (`backend/.tmp/data.db`). If you want to connect to an external PostgreSQL database instead, edit `.env`:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=host.docker.internal   # Or your PostgreSQL host IP
DATABASE_PORT=5432
DATABASE_NAME=glosim_db
DATABASE_USERNAME=glosim_user
DATABASE_PASSWORD=your_secure_postgres_password
DATABASE_SSL=false
```

### Step 4: Verify Deployment
- **Frontend Web Application**: `http://your-vps-ip:5173` (or port `80` if configured)
- **Strapi Admin Panel**: `http://your-vps-ip:1337/admin`
- **Strapi Healthcheck / API**: `http://your-vps-ip:1337/api/conferences`

---

## 6. Environment Variables Reference

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `FRONTEND_PORT` | `5173` | Host port exposed for the frontend Nginx web server |
| `VITE_STRAPI_URL` | `http://localhost:1337` | Strapi API base URL for frontend data fetching |
| `VITE_SITE_TITLE` | `Global Simulation Conference` | Default site title |
| `HOST` | `0.0.0.0` | Strapi server host binding |
| `PORT` / `BACKEND_PORT` | `1337` | Strapi HTTP service port |
| `APP_KEYS` | *(Auto-generated keys)* | Strapi cookie signing and session encryption keys |
| `API_TOKEN_SALT` | *(Auto-generated salt)* | Salt used for Strapi API authentication tokens |
| `ADMIN_JWT_SECRET` | *(Auto-generated secret)* | Secret used to sign admin panel JWT tokens |
| `JWT_SECRET` | *(Auto-generated secret)* | Secret used to sign end-user / API JWT tokens |
| `DATABASE_CLIENT` | `sqlite` | Database engine: `sqlite` or `postgres` |
| `DATABASE_FILENAME` | `.tmp/data.db` | File path for SQLite database |
| `DATABASE_HOST` | `host.docker.internal` | PostgreSQL server host (used when `DATABASE_CLIENT=postgres`) |
| `DATABASE_PORT` | `5432` | PostgreSQL port |
| `DATABASE_NAME` | `glosim_db` | PostgreSQL database name |
| `DATABASE_USERNAME` | `glosim_admin` | PostgreSQL username |
| `DATABASE_PASSWORD` | `glosim_secret_pwd` | PostgreSQL password |
| `DATABASE_SSL` | `false` | Enable SSL for PostgreSQL connection |

---

## 7. Content Management & Admin Workflow

1. Navigate to `http://your-domain-or-ip:1337/admin`.
2. On first visit, register the primary Administrator account.
3. Access the **Content Manager** to edit localized conference records:
   - **Switching Locales**: Use the locale selector dropdown in the top-right corner to toggle between **Chinese (zh)** and **English (en)**.
   - **Publishing Changes**: Always click **Save** and then **Publish** to make changes visible to the public API and frontend.
4. Access the **Media Library** to upload conference schedules, speaker headshots, organization logos, and CFP documents.

---

## 8. API Reference & Internationalization Querying

All endpoints support Strapi's standard i18n filtering. Append `?locale=zh` or `?locale=en` to retrieve language-specific content:

| Endpoint | Method | Supported Locales | Description |
| :--- | :--- | :--- | :--- |
| `/api/global` | `GET` | `zh`, `en` | Site-wide settings, contact info, ICP, navigation links |
| `/api/home-page` | `GET` | `zh`, `en` | Homepage hero banners, statistics, and highlights |
| `/api/conferences` | `GET` | `zh`, `en` | Conference dates, agenda timeline, keynote speakers |
| `/api/org-overview` | `GET` | `zh`, `en` | Organization introduction, mission, bylaws |
| `/api/leaders` | `GET` | `zh`, `en` | Committee leadership profiles and academic titles |
| `/api/member-institutions` | `GET` | `zh`, `en` | Member universities and institutional partners |
| `/api/notices` | `GET` | `zh`, `en` | Conference announcements, news, CFP submissions |

---

## 9. Available NPM Workspace Scripts

| Command | Working Directory | Description |
| :--- | :--- | :--- |
| `npm run dev:all` | Root | Starts both frontend and backend concurrently |
| `npm run dev:frontend` | Root (`frontend`) | Starts Vite development server at `http://localhost:5173` |
| `npm run dev:backend` | Root (`backend`) | Starts Strapi development server at `http://localhost:1337` |
| `npm run build` | Root (All workspaces) | Compiles production builds for both frontend and backend |
| `npm run build:frontend` | Root (`frontend`) | Runs `tsc && vite build` to generate `frontend/dist` |
| `npm run build:backend` | Root (`backend`) | Runs `strapi build` to compile the admin dashboard |
| `npm run start:frontend` | Root (`frontend`) | Previews the compiled frontend bundle locally |
| `npm run start:backend` | Root (`backend`) | Runs `strapi start` for production backend execution |
| `npm run version:bump <ver>` | Root | Synchronizes new version across all packages |
| `npm run version:resolve` | Root | Resolves next pre-release tag & generates release notes |

---

## 10. Automated Versioning & Pre-Release Pipeline

GloSim incorporates an automated, convention-based semantic versioning and release notes generator designed for continuous deployment:

### 1. Versioning Specification
- **Current Base Version**: Starts at `0.0.1`.
- **Pre-Release Tag Convention**: Follows `${VERSION}-pre-${N}` (e.g. `0.0.1-pre-1`, `0.0.1-pre-2`, `0.0.1-pre-n`).
- **Automatic `pre-n` Incrementing**: Whenever code is pushed to the main branch without a base version change in `package.json`, the CI/CD pipeline inspects existing Git tags, finds the highest `pre-n`, and automatically increments to the next tag.
- **Version Resets**: When the base version is bumped (e.g., from `0.0.1` to `0.0.2`), the sequence restarts automatically at `0.0.2-pre-1`.
- **Pre-Release Title**: Always published as `GloSim <version>` (e.g. `GloSim 0.0.1-pre-1`).

### 2. Automated Release Notes Generation
On each release build, the CI/CD pipeline parses commit logs between the previous tag and `HEAD` to generate structured release notes including:
- ✨ **New Features**: Conventional commits starting with `feat:` or `feature:`
- 🐛 **Bug Fixes**: Commits starting with `fix:`
- ⚡ **Performance & Refactoring**: Commits starting with `perf:` or `refactor:`
- 🔧 **Maintenance & Documentation**: Commits starting with `chore:`, `docs:`, or `ci:`
- 📦 **Artifact Overview**: Root Docker Compose configuration, pre-configured SQLite storage, and pruned Node.js production runtime
- ⚡ **Zero-Friction Deployment**: 1-step deployment commands directly in the release body

### 3. Local Version Management Commands
To bump the project base version across root, frontend, and backend packages simultaneously:
```bash
# Bump base version to 0.0.2
npm run version:bump 0.0.2

# Preview next pre-release tag and generate RELEASE_NOTES.md locally
npm run version:resolve
```

