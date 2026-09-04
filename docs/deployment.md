# GloSim Deployment & VPS Architecture Guide

This guide details how to deploy the prebuilt artifacts (from GitHub Actions) on a single VPS using Docker Compose and your own manually deployed PostgreSQL database.

---

## 1. Directory Structure in Deployment Package

When you download and unzip `glosim-deploy-bundle.zip` on your VPS, you get:

```
glosim-deploy/
├── backend/                      # Prebuilt Strapi Backend & production node_modules
│   ├── build/                    # Built Strapi Admin UI
│   ├── config/
│   ├── src/
│   └── public/
├── frontend/                     # Prebuilt Frontend
│   └── dist/                     # Optimized HTML, CSS, JS static assets
├── docker/                       # Docker deployment configurations
│   ├── Dockerfile.backend        # Lightweight Node runtime
│   ├── Dockerfile.frontend       # Lightweight Nginx runner
│   ├── docker-compose.yml        # Multi-container orchestration (Backend + Frontend)
│   └── nginx.conf                # Nginx SPA & Gzip configuration
├── .env.example                  # Environment template
└── .env                          # Your VPS production configuration (created from .env.example)
```

---

## 2. Deploying on VPS (Step-by-Step)

### Step 1: Download & Extract Prebuilt Artifact
```bash
unzip glosim-deploy-bundle.zip -d /opt/glosim
cd /opt/glosim
```

### Step 2: Configure `.env`
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
nano .env
```

Set your production values:
```env
# Frontend API endpoint
VITE_STRAPI_URL=https://api.yourdomain.com

# Backend Secrets
APP_KEYS=randomKey1,randomKey2,randomKey3,randomKey4
API_TOKEN_SALT=your_random_api_token_salt
ADMIN_JWT_SECRET=your_random_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_random_transfer_token_salt
JWT_SECRET=your_random_jwt_secret

# Database - Point to your manually managed PostgreSQL
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
docker compose -f docker/docker-compose.yml up -d --build
```

### Step 4: Verify Deployment
- **Frontend Web App**: `http://your-vps-ip:80`
- **Strapi Backend API & Admin**: `http://your-vps-ip:1337/admin`

---

## 3. GitHub Actions Continuous Integration

The GitHub Actions workflow at [`.github/workflows/build-deploy-artifact.yml`](../.github/workflows/build-deploy-artifact.yml) automatically:
1. Builds both frontend and backend on every push.
2. Packages production node_modules, built admin UI, static web bundle, and Docker files.
3. Produces a downloadable `glosim-deploy-bundle.zip` ready for one-click upload to your VPS.
