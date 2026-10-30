# WinVinaya Foundation — Production Deployment Suite

This directory contains modular, production-ready shell scripts for deploying, configuring, and monitoring the **WinVinaya Foundation** web application.

---

## 📁 Directory Overview

| Script | Purpose |
| :--- | :--- |
| **[`deploy.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/deploy.sh)** | **Master deployment script** that coordinates Git pull, backend build, frontend build, Nginx reload, and health checks. |
| **[`deploy-backend.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/deploy-backend.sh)** | Installs backend dependencies, runs Prisma client generation & DB push, builds TypeScript, and reloads PM2 with zero downtime. |
| **[`deploy-frontend.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/deploy-frontend.sh)** | Installs frontend dependencies, compiles Vite + React assets to `dist/`, applies correct file permissions, and reloads Nginx. |
| **[`health-check.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/health-check.sh)** | Performs comprehensive diagnostic checks on Backend API (`/api/health`), PM2 process, PostgreSQL, Nginx, and disk/memory health. |
| **[`setup-nginx.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/setup-nginx.sh)** | Installs and configures Nginx virtual host files from `nginx/` to `/etc/nginx/sites-available/` and reloads Nginx. |
| **[`common.sh`](file:///c:/External-projects/WinVinaya/wvf_website_new/deploy/common.sh)** | Shared logging utilities, color formatting, prerequisite checks, and path constants. |

---

## 🚀 Quick Start & Usage

### 1. Make Scripts Executable

```bash
chmod +x deploy/*.sh
```

### 2. Full Application Deployment (Default)

Pulls latest code from `main`, updates DB & builds backend, compiles frontend, reloads PM2/Nginx, and runs health checks:

```bash
./deploy/deploy.sh
```

### 3. Deploy Specific Components

#### Backend Only:
```bash
./deploy/deploy-backend.sh

# With database seeding:
./deploy/deploy-backend.sh --seed
```

#### Frontend Only:
```bash
./deploy/deploy-frontend.sh
```

#### Run Health Check & Diagnostics:
```bash
./deploy/health-check.sh

# Verbose mode with system metrics:
./deploy/health-check.sh --verbose

# JSON output for monitoring / cron jobs:
./deploy/health-check.sh --json
```

---

## ⚙️ Advanced Flags for `deploy.sh`

```bash
# Deploy without pulling latest code from Git (local deployment)
./deploy/deploy.sh --skip-git

# Deploy only backend through master script
./deploy/deploy.sh --skip-frontend

# Deploy only frontend through master script
./deploy/deploy.sh --skip-backend

# Deploy a specific branch (e.g., staging or production)
./deploy/deploy.sh --branch production
```

---

## 🔄 GitHub Actions CI/CD Integration

In your `.github/workflows/deploy.yml`, you can invoke the deployment suite via remote SSH:

```yaml
- name: Execute Deployment Script
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.PRODUCTION_HOST }}
    username: ${{ secrets.PRODUCTION_USER }}
    key: ${{ secrets.PRODUCTION_SSH_KEY }}
    port: ${{ secrets.PRODUCTION_PORT || 22 }}
    script: |
      cd /var/www/wvf_website_2.0
      chmod +x deploy/*.sh
      ./deploy/deploy.sh
```
