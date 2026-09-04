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
├── docker/                       # Docker & VPS Deployment Files (moved to root in build artifact)
│   ├── Dockerfile.backend        # Lightweight prebuilt backend runtime
│   ├── Dockerfile.frontend       # Lightweight prebuilt Nginx web server
│   ├── docker-compose.yml        # Multi-container orchestration (Backend + Frontend)
│   └── nginx.conf                # Nginx SPA and Gzip configuration
│
├── .github/                      # CI/CD Workflows
│   └── workflows/
│       └── build-deploy-artifact.yml # Builds prebuilt bundle & publishes Pre-Release
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

1. Download the prebuilt artifact (`glosim.zip`) directly from the latest GitHub **Pre-Release** or Actions artifact.
2. Extract the bundle on your VPS:
   ```bash
   unzip glosim.zip -d /opt/glosim
   cd /opt/glosim
   ```
3. The bundle includes `.env` ready with **SQLite storage** by default! (To connect to external PostgreSQL instead, set `DATABASE_CLIENT=postgres` and your database credentials in `.env`).
4. Launch containers (Docker files are conveniently in the root of the unzipped artifact):
   ```bash
   docker compose up -d --build
   ```
