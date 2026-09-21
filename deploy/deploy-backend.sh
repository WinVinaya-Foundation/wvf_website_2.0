#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Backend Deployment Script
# Location: deploy/deploy-backend.sh
# Usage: ./deploy/deploy-backend.sh [--seed] [--skip-db]
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=deploy/common.sh
source "${SCRIPT_DIR}/common.sh"

RUN_SEED=false
SKIP_DB=false

# Parse command line flags
for arg in "$@"; do
    case $arg in
        --seed)
            RUN_SEED=true
            shift
            ;;
        --skip-db)
            SKIP_DB=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --seed       Run Prisma database seeder after schema push"
            echo "  --skip-db    Skip Prisma schema generation and DB push"
            echo "  --help, -h   Show this help message"
            exit 0
            ;;
    esac
done

log_step "Starting Backend Deployment for WinVinaya Foundation"
check_system_prerequisites
require_cmd "pm2"

if [[ ! -d "${BACKEND_DIR}" ]]; then
    log_error "Backend directory not found at ${BACKEND_DIR}"
    exit 1
fi

cd "${BACKEND_DIR}"

# 1. Environment Verification
log_step "Verifying Backend Environment Configuration"
if [[ ! -f ".env" ]]; then
    if [[ -f ".env.production" ]]; then
        log_warn ".env not found, copying from .env.production..."
        cp .env.production .env
    elif [[ -f ".env.example" ]]; then
        log_warn ".env not found, copying from .env.example..."
        cp .env.example .env
        log_warn "Please ensure you configure production credentials in ${BACKEND_DIR}/.env"
    else
        log_error "No .env file found in ${BACKEND_DIR}. Please create one before deploying."
        exit 1
    fi
fi

# Ensure uploads directory exists
mkdir -p "${BACKEND_DIR}/uploads"

# 2. Dependency Installation
log_step "Installing Backend Dependencies"
if [[ -f "package-lock.json" ]]; then
    log_info "Running 'npm ci'..."
    npm ci
else
    log_info "Running 'npm install'..."
    npm install
fi

# 3. Prisma Database Schema & Client
if [[ "$SKIP_DB" = false ]]; then
    log_step "Generating Prisma Client and Syncing Database Schema"
    log_info "Generating Prisma Client..."
    npx prisma generate

    log_info "Pushing database schema with 'npx prisma db push'..."
    npx prisma db push --skip-generate

    if [[ "$RUN_SEED" = true ]]; then
        log_info "Executing Prisma database seed script..."
        npm run prisma:seed || log_warn "Seeder finished with warnings or already seeded data."
    fi
else
    log_info "Skipping database schema sync as requested (--skip-db)."
fi

# 4. TypeScript Build
log_step "Building Backend TypeScript Source Code"
npm run build

if [[ ! -f "dist/index.js" ]]; then
    log_error "Build failed: dist/index.js does not exist after compilation."
    exit 1
fi
log_success "Backend build succeeded (dist/index.js generated)."

# 5. Process Management via PM2
log_step "Reloading Backend Process in PM2 (${PM2_APP_NAME})"
if pm2 describe "${PM2_APP_NAME}" > /dev/null 2>&1; then
    log_info "Reloading existing PM2 process '${PM2_APP_NAME}' with zero downtime..."
    pm2 reload "${PM2_APP_NAME}" --update-env
else
    log_info "Starting new PM2 process '${PM2_APP_NAME}'..."
    pm2 start dist/index.js --name "${PM2_APP_NAME}" --time
fi

# Save PM2 process list
pm2 save

# 6. Backend Health Verification
log_step "Verifying Backend API Health"
MAX_RETRIES=10
RETRY_DELAY=2
BACKEND_HEALTHY=false

log_info "Checking health endpoint at ${HEALTH_ENDPOINT}..."
for i in $(seq 1 $MAX_RETRIES); do
    sleep $RETRY_DELAY
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${HEALTH_ENDPOINT}" || echo "000")
    if [[ "$HTTP_CODE" -eq 200 ]]; then
        BACKEND_HEALTHY=true
        log_success "Backend health check passed! (HTTP 200 from ${HEALTH_ENDPOINT})"
        break
    else
        log_warn "Health check attempt $i/$MAX_RETRIES returned status $HTTP_CODE. Retrying in ${RETRY_DELAY}s..."
    fi
done

if [[ "$BACKEND_HEALTHY" = false ]]; then
    log_error "Backend health check failed after $MAX_RETRIES attempts. Checking PM2 logs..."
    pm2 logs "${PM2_APP_NAME}" --lines 20 --nostream || true
    exit 1
fi

log_success "Backend Deployment Completed Successfully!"
