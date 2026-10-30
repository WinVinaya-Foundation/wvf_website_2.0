#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Nginx Web Server Configuration Script
# Location: deploy/setup-nginx.sh
# Usage: ./deploy/setup-nginx.sh [--force]
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=deploy/common.sh
source "${SCRIPT_DIR}/common.sh"

log_step "Setting up Nginx Web Server Configuration for WinVinaya Foundation"

SITES_AVAILABLE="/etc/nginx/sites-available"
SITES_ENABLED="/etc/nginx/sites-enabled"
CONF_SOURCE="${NGINX_DIR}/winvinaya.conf"
CONF_TARGET="${SITES_AVAILABLE}/${NGINX_SITE_NAME}"
MASTER_CONF_SOURCE="${NGINX_DIR}/nginx.conf"
MASTER_CONF_TARGET="/etc/nginx/nginx.conf"

if [[ ! -f "$CONF_SOURCE" ]]; then
    log_error "Source config $CONF_SOURCE not found."
    exit 1
fi

SUDO_CMD=""
if [ "$EUID" -ne 0 ]; then
    if command -v sudo &>/dev/null; then
        SUDO_CMD="sudo"
    else
        log_error "This script requires root or sudo privileges to configure Nginx."
        exit 1
    fi
fi

# 1. Check if certbot directory exists for ACME challenge
$SUDO_CMD mkdir -p /var/www/certbot

# 2. Copy site configuration
log_info "Copying virtual host configuration to ${CONF_TARGET}..."
$SUDO_CMD cp "$CONF_SOURCE" "$CONF_TARGET"

# Optional: Master nginx.conf backup & copy if requested
if [[ -f "$MASTER_CONF_SOURCE" ]]; then
    log_info "Backing up and updating master /etc/nginx/nginx.conf..."
    $SUDO_CMD cp "$MASTER_CONF_TARGET" "${MASTER_CONF_TARGET}.bak" 2>/dev/null || true
    $SUDO_CMD cp "$MASTER_CONF_SOURCE" "$MASTER_CONF_TARGET"
fi

# 3. Enable site
log_info "Enabling virtual host in ${SITES_ENABLED}..."
$SUDO_CMD ln -sf "$CONF_TARGET" "${SITES_ENABLED}/${NGINX_SITE_NAME}"

# Remove default nginx site if enabled
if [[ -L "${SITES_ENABLED}/default" || -f "${SITES_ENABLED}/default" ]]; then
    log_info "Removing default Nginx site configuration..."
    $SUDO_CMD rm -f "${SITES_ENABLED}/default"
fi

# 4. Test Nginx Configuration
log_step "Testing Nginx Configuration Syntax"
$SUDO_CMD nginx -t

# 5. Reload Nginx
log_step "Reloading Nginx Service"
$SUDO_CMD systemctl reload nginx
$SUDO_CMD systemctl enable nginx

log_success "Nginx Configuration Setup Completed Successfully!"
