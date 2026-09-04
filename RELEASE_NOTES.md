## GloSim 0.0.1-pre-1

> **Automated Pre-Release Build** · Tag: `0.0.1-pre-1` · Commit: `8351e12` · Date: 2026-09-04 06:23:28 UTC

### 🚀 What's New & Feature Highlights

#### ✨ New Features
- **feat: implement Docker production deployment configuration for backend and frontend services** (`1950d91`)

#### 🔧 Maintenance & Documentation
- **chore: generate repository documentation graph using Graphify** (`8351e12`)

### 📦 Artifact Highlights

- **Root Docker Configuration**: `docker-compose.yml`, `Dockerfile.backend`, `Dockerfile.frontend`, and `nginx.conf` are placed directly in the root of `glosim.zip`.
- **Ready-to-run SQLite Storage**: `.env` is pre-configured with `DATABASE_CLIENT=sqlite` and persistent storage at `backend/.tmp/data.db`.
- **Production Pruned Runtime**: Backend contains only production `node_modules` (`npm prune --production`), requiring no Node build tools on the host.
- **Optimized Frontend SPA**: Prebuilt static assets served via lightweight Nginx Alpine container with Gzip compression.

### ⚡ Quick Deployment Instructions

1. **Download and Extract Bundle**:
   ```bash
   unzip glosim.zip -d /opt/glosim
   cd /opt/glosim
   ```

2. **(Optional) Configure Database in `.env`**:
   Defaults to zero-configuration SQLite. To connect to external PostgreSQL instead, edit `.env`:
   ```env
   DATABASE_CLIENT=postgres
   DATABASE_HOST=host.docker.internal
   DATABASE_PORT=5432
   DATABASE_NAME=glosim_db
   DATABASE_USERNAME=glosim_user
   DATABASE_PASSWORD=your_password
   ```

3. **Launch Containers**:
   ```bash
   docker compose up -d --build
   ```

4. **Access Applications**:
   - **Frontend**: http://your-vps-ip:5173
   - **Strapi CMS Admin**: http://your-vps-ip:1337/admin
