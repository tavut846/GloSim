# GloSim (Global Simulation Conference)

> **Bilingual Multi-Page Academic Conference Platform & Headless CMS**  
> Chinese (简体中文) & English (English) · Strapi Headless CMS · React / Vite Frontend

---

## 1. Project Directory Structure

```
GloSim/
├── backend/                      # Strapi CMS (Backend API & Admin Dashboard)
│   ├── config/                   # Dynamic database (SQLite / PostgreSQL), plugins, CORS
│   ├── src/                      # 7 Localized Content Types & Auto-bootstrap
│   └── package.json
│
├── frontend/                     # Modern Bilingual Frontend Web Application
│   ├── src/                      # 5 Core Pages, UI components, Strapi REST client
│   ├── index.html
│   └── package.json
│
├── docker/                       # Docker & VPS Deployment Files
│   ├── Dockerfile.backend        # Lightweight prebuilt backend runtime
│   ├── Dockerfile.frontend       # Lightweight prebuilt Nginx web server
│   ├── docker-compose.yml        # Multi-container orchestration (Backend + Frontend)
│   └── nginx.conf                # Nginx SPA and Gzip configuration
│
├── .github/                      # CI/CD Workflows
│   └── workflows/
│       └── build-deploy-artifact.yml # Builds & zips prebuilt deployment bundle
│
├── docs/                         # Specifications & Guides
│   ├── plan.md                   # Product requirement & information architecture plan
│   └── deployment.md             # Single VPS Deployment & Database guide
│
├── design_prototypes/            # Preserved prototype reference HTML files
├── package.json                  # Root workspace runner
├── .env.example                  # Unified environment template
└── README.md
```

---

## 2. Quickstart Guide (Local Development)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Frontend Development Server
```bash
npm run dev:frontend
```
- **Frontend URL**: http://localhost:5173

### Step 3: Run Strapi CMS Backend (SQLite)
```bash
npm run dev:backend
```
- **Strapi Admin Panel**: http://localhost:1337/admin
- **Strapi API Base**: http://localhost:1337/api

Or run full-stack debug in VS Code by pressing **`F5`**!

---

## 3. Production VPS Deployment (Prebuilt Artifacts)

1. GitHub Actions automatically builds and packages the whole project on push (`glosim-deploy-bundle.zip`).
2. Extract the bundle on your VPS:
   ```bash
   unzip glosim-deploy-bundle.zip -d /opt/glosim
   cd /opt/glosim
   cp .env.example .env
   ```
3. Set your PostgreSQL credentials in `.env` (connect to your manually managed PostgreSQL instance via `DATABASE_HOST=host.docker.internal` or IP).
4. Launch containers:
   ```bash
   docker compose -f docker/docker-compose.yml up -d --build
   ```
