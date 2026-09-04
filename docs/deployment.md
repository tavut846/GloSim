# GloSim Deployment & VPS Architecture Guide

This guide details how to deploy the prebuilt artifacts (from GitHub Actions) on a single VPS using Docker Compose and your own manually deployed PostgreSQL database.

---

## 1. Directory Structure in Deployment Package

When you download and unzip `glosim-deploy-bundle.zip` on your VPS, all deployment files are conveniently at the root:

```
glosim-deploy/
├── docker-compose.yml        # Multi-container orchestration (Backend + Frontend)
├── Dockerfile.backend        # Lightweight Node runtime
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
│   └── .tmp/                 # SQLite database storage directory
└── frontend/                 # Prebuilt Frontend
    └── dist/                 # Optimized HTML, CSS, JS static assets
```

---

## 2. Deploying on VPS (Step-by-Step)

### Step 1: Download & Extract Prebuilt Artifact
Download `glosim-deploy-bundle.zip` from the latest GitHub **Pre-Release** or Actions Artifact:
```bash
unzip glosim-deploy-bundle.zip -d /opt/glosim
cd /opt/glosim
```

### Step 2: (Optional) Configure `.env`
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

### Step 3: Launch Containers
From the project root:
```bash
docker compose up -d --build
```

### Step 4: Verify Deployment
- **Frontend Web App**: `http://your-vps-ip:80`
- **Strapi Backend API & Admin**: `http://your-vps-ip:1337/admin`

---

## 3. GitHub Actions Continuous Integration

The GitHub Actions workflow at [`.github/workflows/build-deploy-artifact.yml`](../.github/workflows/build-deploy-artifact.yml) automatically:
1. Builds both frontend and backend on every push.
2. Packages production node_modules, built admin UI, static web bundle, and Docker files in the root folder.
3. Uploads the folder directly to GitHub Actions Artifacts (no zip-in-zip when downloading).
4. Publishes `glosim-deploy-bundle.zip` to GitHub **Pre-Releases** for immediate 1-click download.
