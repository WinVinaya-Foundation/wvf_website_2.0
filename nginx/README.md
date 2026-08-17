# Nginx Deployment & SSL Setup Guide for WinVinaya Foundation

This directory contains the production-grade, security-hardened Nginx configuration files for **`winvinayafoundation.org`** and **`www.winvinayafoundation.org`**.

---

## Folder Contents

- **`nginx.conf`**: Master Nginx configuration (Worker processes, rate-limiting zones, Gzip compression).
- **`winvinaya.conf`**: Site-specific Virtual Host configuration (HTTPS redirection, SPA routing fallback, `/api` proxying, `/uploads` static file proxy, HSTS, SSL ciphers, and security headers).

---

## Step-by-Step Production Deployment Guide (Ubuntu / Debian Linux)

### Step 1: Install Nginx & Certbot

Run the following commands on your production server:

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

### Step 2: Issue Free Let's Encrypt SSL Certificate

Execute Certbot to generate SSL certificates for `winvinayafoundation.org` and `www.winvinayafoundation.org`:

```bash
sudo certbot certonly --nginx -d winvinayafoundation.org -d www.winvinayafoundation.org
```

Certbot will automatically save the certificate files to:
- `/etc/letsencrypt/live/winvinayafoundation.org/fullchain.pem`
- `/etc/letsencrypt/live/winvinayafoundation.org/privkey.pem`

---

### Step 3: Copy Configuration Files

Copy the configuration files from this project repository to Nginx system directories:

```bash
# 1. Backup existing master nginx.conf (optional)
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

# 2. Copy master configuration
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf

# 3. Copy virtual host configuration
sudo cp nginx/winvinaya.conf /etc/nginx/sites-available/winvinayafoundation.org

# 4. Enable virtual host site
sudo ln -sf /etc/nginx/sites-available/winvinayafoundation.org /etc/nginx/sites-enabled/

# 5. Remove default Nginx site link
sudo rm -f /etc/nginx/sites-enabled/default
```

---

### Step 4: Verify Nginx Build Directory & Permissions

Ensure your built React frontend application lives in `/var/www/wvf_website/frontend/dist`:

```bash
sudo mkdir -p /var/www/wvf_website
# Copy your frontend dist build into /var/www/wvf_website/frontend/dist

# Set www-data ownership
sudo chown -R www-data:www-data /var/www/wvf_website
sudo chmod -R 755 /var/www/wvf_website
```

---

### Step 5: Test & Restart Nginx

Test the Nginx configuration for syntax errors:

```bash
sudo nginx -t
```

If the test passes (`syntax is ok`), reload Nginx:

```bash
sudo systemctl reload nginx
sudo systemctl enable nginx
```

---

## Verification & SSL Auto-Renewal

### Verify SSL Auto-Renewal Timer
Certbot automatically installs a renewal timer. Verify it with:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## Security Features Included in `winvinayafoundation.org` Configuration

1. **HTTP to HTTPS 301 Permanent Redirect**: Forces all HTTP traffic to secure TLS connections.
2. **Canonical WWW Redirect**: Redirects `www.winvinayafoundation.org` to `https://winvinayafoundation.org`.
3. **Single-Page Application (SPA) Fallback**: `try_files $uri $uri/ /index.html;` ensures TanStack React Router routes work cleanly without 404s on browser refresh.
4. **Backend API Reverse Proxy**: Proxies `/api/` traffic to Express backend (`http://127.0.0.1:4000`).
5. **Rate-Limitation Zones**: Caps global API requests to 15 r/s and login attempts to 5 r/m to prevent DDoS and Brute-Force attacks.
6. **Cyber Security Headers**:
   - `Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"`
   - `X-Frame-Options "DENY"` (Clickjacking prevention)
   - `X-Content-Type-Options "nosniff"` (MIME sniffing defense)
   - `X-XSS-Protection "1; mode=block"`
   - `Referrer-Policy "strict-origin-when-cross-origin"`
