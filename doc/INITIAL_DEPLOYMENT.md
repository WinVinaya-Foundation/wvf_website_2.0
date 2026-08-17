# Initial Server Deployment Guide — WinVinaya Foundation

This guide provides step-by-step instructions for provisioning a fresh Ubuntu Linux server (22.04 LTS / 24.04 LTS), configuring PostgreSQL, installing Node.js & PM2, building the React frontend, setting up backend environment variables, seeding initial database content, issuing SSL certificates via Certbot for **`winvinayafoundation.org`**, and configuring Nginx web server security.

---

## 1. Recommended Server Specifications

- **Operating System**: Ubuntu 22.04 LTS or 24.04 LTS (64-bit)
- **CPU**: 2 vCPUs minimum
- **RAM**: 2 GB RAM minimum (4 GB recommended)
- **Storage**: 25 GB+ SSD
- **Network**: Static Public IPv4 Address with Ports `80` (HTTP), `443` (HTTPS), and `22` (SSH) open.

---

## 2. Phase 1: Server Tooling & Node.js Installation

Connect to your server via SSH:

```bash
ssh ubuntu@<YOUR_SERVER_IP>
```

### Step 1.1: System Package Updates

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git ufw unzip build-essential
```

### Step 1.2: Install Node.js 20.x LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v # Verify version (should be v20.x.x)
npm -v  # Verify npm version
```

### Step 1.3: Install PM2 Process Manager Globally

```bash
sudo npm install -g pm2
```

---

## 3. Phase 2: PostgreSQL Database Installation & Setup

### Step 2.1: Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Step 2.2: Create Database User & Database

Access the PostgreSQL interactive shell:

```bash
sudo -u postgres psql
```

Execute the SQL commands below (replace `YOUR_SECURE_DB_PASSWORD` with a strong password):

```sql
-- Create database user
CREATE USER wvfuser WITH PASSWORD 'winvinayamoonlightfoundation';

-- Create database
CREATE DATABASE wvfwebsite OWNER wvfuser;

-- Grant database privileges
GRANT ALL PRIVILEGES ON DATABASE wvfwebsite TO wvfuser;
\c wvfwebsite
GRANT ALL ON SCHEMA public TO wvfuser;

-- Exit psql shell
\q
```

---

## 4. Phase 3: Directory Structure & Codebase Setup

### Step 3.1: Create Web Directory

```bash
sudo mkdir -p /var/www/wvf_website_2.0
sudo chown -R $USER:$USER /var/www/wvf_website_2.0
```

### Step 3.2: Clone Project Repository

```bash
cd /var/www/wvf_website_2.0
git clone https://github.com/WinVinaya-Foundation/wvf_website_2.0.git .
```

---

## 5. Phase 4: Backend Setup & Initial Prisma Seeding

### Step 4.1: Install Backend Dependencies

```bash
cd /var/www/wvf_website_2.0/backend
npm ci
```

### Step 4.2: Create Production `.env` File

Create `backend/.env` file:

```bash
nano .env
```

Paste and customize the production configuration below:

```env
PORT=4000
NODE_ENV=production
DATABASE_URL="postgresql://wvfuser:YOUR_SECURE_DB_PASSWORD@localhost:5432/wvfwebsite?schema=public"
JWT_SECRET="CREATE_A_LONG_RANDOM_SECRET_KEY_HERE_MIN_32_CHARS"
ADMIN_EMAIL="akila.sankar@winvinayafoundation.org"
FRONTEND_ORIGIN="https://winvinayafoundation.org"

# Razorpay Production Keys (If active)
RAZORPAY_KEY_ID="rzp_live_xxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxx"
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

### Step 4.3: Push Database Schema & Run Seeding

```bash
# Generate Prisma Client
npx prisma generate

# Push database schema to PostgreSQL
npx prisma db push

# Run seed script to populate categories, admin accounts, stories, blogs, newsletters, ebooks, job openings, and contact inquiries
npm run prisma:seed
```

### Step 4.4: Build Backend TypeScript

```bash
npm run build
```

### Step 4.5: Start Express Backend with PM2

```bash
pm2 start dist/index.js --name "wvf-backend"
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
```

Verify backend health:

```bash
curl http://localhost:4000/api/health # Output: {"status":"ok"}
```

---

## 6. Phase 5: Frontend Build & Nginx Web Server Setup

### Step 5.1: Create Frontend `.env` File

```bash
cd /var/www/wvf_website_2.0/frontend
nano .env
```

Add:

```env
VITE_API_BASE_URL=/api
```

Save and exit.

### Step 5.2: Install Dependencies & Build Frontend Assets

```bash
npm ci
npm run build
```

### Step 5.3: Set Static Asset Permissions for Nginx

```bash
sudo chown -R www-data:www-data /var/www/wvf_website_2.0/frontend/dist
sudo chmod -R 755 /var/www/wvf_website_2.0/frontend/dist
```

---

## 7. Phase 6: Nginx Web Server & SSL Setup

### Step 6.1: Install Nginx & Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 6.2: Copy Nginx Master & Site Configurations

```bash
cd /var/www/wvf_website_2.0

# Copy master Nginx config
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

# Copy winvinayafoundation.org site config
sudo cp nginx/winvinaya.conf /etc/nginx/sites-available/winvinayafoundation.org

# Enable virtual host
sudo ln -sf /etc/nginx/sites-available/winvinayafoundation.org /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
```

### Step 6.3: Issue Let's Encrypt SSL Certificates

```bash
sudo certbot --nginx -d winvinayafoundation.org -d www.winvinayafoundation.org
```

Certbot will automatically update SSL certificate paths in `/etc/nginx/sites-available/winvinayafoundation.org`.

### Step 6.4: Test & Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx
```

---

## 8. Phase 7: UFW Firewall Hardening

Configure UFW firewall to allow only SSH, HTTP, and HTTPS:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 9. Verification & Post-Deployment Checklist

1. Open `https://winvinayafoundation.org` in your browser.
2. Verify SSL certificate lock icon in browser address bar.
3. Test Admin Login at `https://winvinayafoundation.org/admin/login` using seeded admin credentials (`akila.sankar@winvinayafoundation.org`).
4. Test visitor contact submission at `https://winvinayafoundation.org/contact` and verify message appears in `/admin/contact`.
5. Check Nginx access logs: `sudo tail -f /var/log/nginx/access.log`.
6. Check PM2 backend logs: `pm2 logs wvf-backend`.
