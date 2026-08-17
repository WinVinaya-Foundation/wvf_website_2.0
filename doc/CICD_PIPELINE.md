# CI/CD Pipeline & Git Deployment Guide — WinVinaya Foundation

This document details the automated Continuous Integration and Continuous Deployment (CI/CD) pipeline for **WinVinaya Foundation** (`winvinayafoundation.org`). It outlines the step-by-step process for pushing code to Git, automated testing and building, Prisma database migrations, PM2 process management, and production deployment via GitHub Actions and Nginx.

---

## 1. Architecture Overview

```
 [ Local Developer ]
        │
        │ 1. git push origin main
        ▼
  [ GitHub Repository ]
        │
        │ 2. Triggers GitHub Actions Workflow (.github/workflows/deploy.yml)
        ▼
 ┌─────────────────────────────────────────────────────────┐
 │                  GitHub Actions Runner                  │
 │                                                         │
 │  • Check out repository code                            │
 │  • Setup Node.js 20.x environment                       │
 │  • Backend Audit: npx tsc --noEmit                       │
 │  • Frontend Audit: npm run build (TypeScript + Vite)    │
 │  • Validate Prisma Schema                               │
 └────────────────────────────┬────────────────────────────┘
                              │
                              │ 3. Automated SSH Deployment (If CI Passes)
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │        Production Server (winvinayafoundation.org)      │
 │                                                         │
 │  • Git pull latest code on main branch                  │
 │  • Install backend dependencies: npm ci                 │
 │  • Run database schema push: npx prisma db push         │
 │  • Build frontend static assets: npm run build          │
 │  • Publish dist/ files to /var/www/wvf_website/frontend │
 │  • Zero-Downtime Backend Reload: pm2 reload wvf-backend │
 │  • Reload Web Server: sudo systemctl reload nginx       │
 └─────────────────────────────────────────────────────────┘
```

---

## 2. Developer Git Workflow (Step-by-Step)

Follow this standard Git workflow for all bug fixes, features, and content updates:

### Step 2.1: Pull Latest Main Branch

Before starting work, ensure your local repository is up to date with the latest production code:

```bash
git checkout main
git pull origin main
```

### Step 2.2: Create a Feature Branch

Create a descriptive feature branch for your changes:

```bash
# Example feature branch names:
git checkout -b feature/add-new-blog-section
# or
git checkout -b fix/donation-form-validation
```

### Step 2.3: Make Code Changes & Test Locally

Test both backend and frontend locally to verify zero build errors before committing:

```bash
# 1. Test Backend Type Check
cd backend
npx tsc --noEmit

# 2. Test Frontend Production Build
cd ../frontend
npm run build
```

### Step 2.4: Stage & Commit Code

Commit your changes with clear, structured commit messages:

```bash
git add .
git commit -m "feat(careers): add PDF upload support and dynamic DB integration"
```

### Step 2.5: Push Branch to Git & Create Pull Request

Push your branch to GitHub:

```bash
git push -u origin feature/add-new-blog-section
```

Open GitHub in your browser and create a **Pull Request (PR)** targeting the `main` branch. Once reviewed and approved, merge the PR into `main`.

---

## 3. Production Continuous Deployment (CD) Steps

When code is merged into `main`, GitHub Actions automatically connects to your production server via SSH and executes the following deployment commands:

```bash
# 1. Navigate to repository root on server
cd /var/www/wvf_website

# 2. Fetch & hard reset to latest main commit
git fetch origin
git reset --hard origin/main

# 3. Update & compile Backend
cd /var/www/wvf_website/backend
npm ci --production=false
npx prisma generate
npx prisma db push
npm run build

# 4. Update & compile Frontend
cd /var/www/wvf_website/frontend
npm ci
npm run build

# 5. Set correct file permissions for Nginx
sudo chown -R www-data:www-data /var/www/wvf_website/frontend/dist
sudo chmod -R 755 /var/www/wvf_website/frontend/dist

# 6. Zero-Downtime PM2 Express Backend Reload
pm2 reload wvf-backend || pm2 start dist/index.js --name "wvf-backend"

# 7. Reload Nginx Web Server
sudo systemctl reload nginx
```

---

## 4. Required GitHub Repository Secrets Setup

To enable the automated SSH deployment pipeline, add the following secrets under **GitHub Repository Settings -> Secrets and variables -> Actions**:

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `PRODUCTION_HOST` | Production server IP address or domain | `winvinayafoundation.org` |
| `PRODUCTION_USER` | SSH user with sudo/deployment privileges | `ubuntu` or `deploy` |
| `PRODUCTION_SSH_KEY` | Private SSH key matching `~/.ssh/authorized_keys` | `-----BEGIN OPENSSH PRIVATE KEY----- ...` |
| `PRODUCTION_PORT` | SSH Port (Default: 22) | `22` |

---

## 5. Production Server PM2 Setup (One-Time Initialization)

On the production server, install PM2 globally to manage the Node.js Express backend process indefinitely:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Navigate to backend directory and start process
cd /var/www/wvf_website/backend
pm2 start dist/index.js --name "wvf-backend"

# Save PM2 state & enable startup on server reboot
pm2 save
pm2 startup
```

Useful PM2 Management Commands:

```bash
pm2 status             # View backend process status & uptime
pm2 logs wvf-backend   # View live backend stdout & error logs
pm2 reload wvf-backend # Zero-downtime reload backend process
pm2 restart wvf-backend# Force restart backend process
```
