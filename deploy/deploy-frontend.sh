#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Frontend Deployment Script
# Location: deploy/deploy-frontend.sh
# Usage: ./deploy/deploy-frontend.sh [--skip-nginx]
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=deploy/common.sh
source "${SCRIPT_DIR}/common.sh"

SKIP_NGINX=false

# Parse command line flags
for arg in "$@"; do
    case $arg in
        --skip-nginx)
            SKIP_NGINX=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --skip-nginx Skip testing and reloading Nginx after build"
            echo "  --help, -h   Show this help message"
            exit 0
            ;;
    esac
done

log_step "Starting Frontend Deployment for WinVinaya Foundation"
check_system_prerequisites

if [[ ! -d "${FRONTEND_DIR}" ]]; then
    log_error "Frontend directory not found at ${FRONTEND_DIR}"
    exit 1
fi

cd "${FRONTEND_DIR}"

# 1. Environment Verification
log_step "Verifying Frontend Environment Configuration"
if [[ ! -f ".env" ]]; then
    if [[ -f ".env.production" ]]; then
        log_warn ".env not found, copying from .env.production..."
        cp .env.production .env
    else
        log_info "Creating default frontend .env file (VITE_API_BASE_URL=/api)..."
        echo "VITE_API_BASE_URL=/api" > .env
    fi
fi

# 2. Dependency Installation
log_step "Installing Frontend Dependencies"
if [[ -f "package-lock.json" ]]; then
    log_info "Running 'npm ci'..."
    npm ci
else
    log_info "Running 'npm install'..."
    npm install
fi

# 3. Production Build
log_step "Building Frontend Production Assets (Vite + TypeScript)"
npm run build

if [[ ! -f "dist/index.html" ]]; then
    log_error "Build failed: dist/index.html does not exist after build."
    exit 1
fi
log_success "Frontend production build succeeded (dist/ assets generated)."

# 4. Set Static Asset Permissions
log_step "Setting Directory & File Permissions for Web Server"
chmod -R 755 "${FRONTEND_DIR}/dist" || true

if id "www-data" &>/dev/null && [ "$EUID" -eq 0 ]; then
    chown -R www-data:www-data "${FRONTEND_DIR}/dist" || true
    log_info "Set ownership of dist/ to www-data:www-data"
elif command -v sudo &>/dev/null && sudo -n true 2>/dev/null; then
    sudo chown -R www-data:www-data "${FRONTEND_DIR}/dist" 2>/dev/null || true
    sudo chmod -R 755 "${FRONTEND_DIR}/dist" 2>/dev/null || true
fi

# 5. Reload Nginx Web Server
if [[ "$SKIP_NGINX" = false ]]; then
    log_step "Validating and Reloading Nginx Web Server"
    if command -v nginx &>/dev/null; then
        if [ "$EUID" -eq 0 ]; then
            nginx -t
            systemctl reload nginx
            log_success "Nginx reloaded successfully."
        elif command -v sudo &>/dev/null; then
            sudo nginx -t
            sudo systemctl reload nginx
            log_success "Nginx reloaded successfully via sudo."
        else
            log_warn "Nginx installed but insufficient permissions to reload. Please run: sudo systemctl reload nginx"
        fi
    else
        log_warn "Nginx command not found on host. Skipping Nginx reload."
    fi
else
    log_info "Skipping Nginx reload as requested (--skip-nginx)."
fi

log_success "Frontend Deployment Completed Successfully!"
