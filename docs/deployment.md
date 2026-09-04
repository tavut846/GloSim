# GloSim Deployment & VPS Architecture Guide

This guide details how to deploy the prebuilt artifacts (from GitHub Actions) on a single VPS using Docker Compose and your own manually deployed PostgreSQL database.

---

## 1. Directory Structure in Deployment Package

When you download and unzip `glosim.zip` on your VPS, all deployment files are conveniently at the root:

```
glosim-deploy/
├── docker-compose.yml        # Multi-container orchestration (Backend + Frontend)
├── Dockerfile.backend        # Lightweight Node 20 Slim runtime
├── Dockerfile.frontend       # Lightweight Nginx runner
├── nginx.conf                # Nginx SPA & Gzip configuration
├── .env                      # Pre-configured production config (defaults to SQLite)
├── .env.example              # Environment template
├── README.md                 # Deployment quickstart
├── backend/                  # Prebuilt Strapi Backend & production node_modules
│   ├── build/                # Built Strapi Admin UI
│   ├── config/
│   ├── src/
│   ├── public/
│   ├── server.js             # Direct Node entry point (avoids symlink issues)
│   └── .tmp/                 # SQLite database storage directory
└── frontend/                 # Prebuilt Frontend
    └── dist/                 # Optimized HTML, CSS, JS static assets
```

---

## 2. Deploying on VPS (Step-by-Step)

### 🚀 One-Command Instant Deploy (Recommended)
On any fresh Linux VPS, run this single command to automatically download the latest Pre-Release, set up SQLite storage, install the global `glosim` CLI, and launch containers:

```bash
curl -fsSL https://raw.githubusercontent.com/tavut846/GloSim/main/docker/glosim-deploy.sh | bash -s deploy
```

> [!TIP]
> After deployment completes, simply type **`glosim`** anywhere on your server to open the interactive management menu:
> - `1) Add 'glosim' command to VPS`: Creates a system-wide `/usr/local/bin/glosim` shortcut.
> - `2) Deploy / Start GloSim`: Runs containers via Docker Compose.
> - `3) Uninstall GloSim`: Tears down containers while preserving your database (`backend/.tmp/data.db`) and uploaded media.
> - `4) Clear Container Logs`: Safely truncates container log streams.
> - `5) Update GloSim`: Automatically downloads and applies the latest Pre-Release from GitHub (`tavut846/GloSim`).
> - `6) View Platform Status`: Displays version, database engine, container health, ports, and access URLs.

---

### Alternative: Manual Download & Extraction
Download `glosim.zip` from the latest GitHub **Pre-Release** or Actions Artifact:
```bash
unzip glosim.zip -d /opt/glosim
cd /opt/glosim
```

### Step 2: Launch Containers
From the extracted bundle root:
```bash
docker compose up -d --build
```

### Step 3: (Optional) Configure External PostgreSQL
By default, `.env` is already configured with **SQLite storage** for zero-configuration startup!

If you want to use your external PostgreSQL database instead, edit `.env`:
```bash
nano .env
```

And update the database settings:
```env
# Database - Switch from SQLite to PostgreSQL
DATABASE_CLIENT=postgres
DATABASE_HOST=host.docker.internal   # Or 127.0.0.1 / your PostgreSQL server IP
DATABASE_PORT=5432
DATABASE_NAME=glosim_db
DATABASE_USERNAME=glosim_user
DATABASE_PASSWORD=your_secure_postgres_password
DATABASE_SSL=false
```

> [!TIP]
> If your PostgreSQL is running directly on the VPS host, `host.docker.internal` allows Docker containers to securely connect directly to your host's PostgreSQL on port 5432.

### Step 4: Launch Containers (Direct Command)
If you prefer direct Docker CLI commands without the interactive menu:
```bash
docker compose up -d --build
```

### Step 5: Verify Deployment
- **Frontend Web App**: `http://your-vps-ip:5173` (or port 80 if configured)
- **Strapi Backend API & Admin**: `http://your-vps-ip:1337/admin`

---

## 3. GitHub Actions Continuous Integration

The GitHub Actions workflow at [`.github/workflows/build-deploy-artifact.yml`](../.github/workflows/build-deploy-artifact.yml) automatically:
1. Builds both frontend and backend on every push.
2. Packages production node_modules, built admin UI, static web bundle, and Docker files in the root folder.
3. Uploads the folder directly to GitHub Actions Artifacts (no zip-in-zip when downloading).
4. Publishes `glosim.zip` to GitHub **Pre-Releases** for immediate 1-click download.
