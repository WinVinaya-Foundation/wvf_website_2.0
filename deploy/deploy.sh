#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Master Production Deployment Script
# Location: deploy/deploy.sh
# Usage: ./deploy/deploy.sh [OPTIONS]
# ==============================================================================

set -eo pipefail

START_TIME=$(date +%s)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=deploy/common.sh
source "${SCRIPT_DIR}/common.sh"

SKIP_GIT=false
SKIP_FRONTEND=false
SKIP_BACKEND=false
SKIP_HEALTH=false
RUN_SEED=false
BRANCH="${DEPLOY_BRANCH:-main}"

# Parse command line flags
while [[ $# -gt 0 ]]; do
    case "$1" in
        --skip-git)
            SKIP_GIT=true
            shift
            ;;
        --skip-frontend)
            SKIP_FRONTEND=true
            shift
            ;;
        --skip-backend)
            SKIP_BACKEND=true
            shift
            ;;
        --skip-health)
            SKIP_HEALTH=true
            shift
            ;;
        --seed)
            RUN_SEED=true
            shift
            ;;
        --branch=*)
            BRANCH="${1#*=}"
            shift
            ;;
        --branch|-b)
            BRANCH="$2"
            shift 2
            ;;
        --help|-h)
            echo "WinVinaya Foundation Automated Deployment Suite"
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --skip-git         Skip pulling latest code from git repository"
            echo "  --skip-frontend    Skip building and deploying frontend assets"
            echo "  --skip-backend     Skip building and deploying backend service"
            echo "  --skip-health      Skip post-deployment health check"
            echo "  --seed             Run Prisma database seed after DB sync"
            echo "  --branch, -b NAME  Specify Git branch to pull (Default: main)"
            echo "  --help, -h         Display this help message"
            exit 0
            ;;
        *)
            log_warn "Unknown parameter: $1"
            shift
            ;;
    esac
done

echo -e "${COLOR_BOLD}${COLOR_BLUE}=================================================================${COLOR_RESET}"
echo -e "${COLOR_BOLD}     WinVinaya Foundation — Automated Deployment Pipeline        ${COLOR_RESET}"
echo -e "${COLOR_BOLD}${COLOR_BLUE}=================================================================${COLOR_RESET}"
log_info "Target Directory : ${PROJECT_ROOT}"
log_info "Git Branch       : ${BRANCH}"
log_info "PM2 Process      : ${PM2_APP_NAME}"

check_system_prerequisites

# ------------------------------------------------------------------------------
# 1. Pull Latest Code from Git
# ------------------------------------------------------------------------------
if [[ "$SKIP_GIT" = false ]]; then
    log_step "Updating Repository from Git (branch: ${BRANCH})"
    cd "${PROJECT_ROOT}"
    
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        log_info "Fetching latest changes from origin..."
        git fetch origin "${BRANCH}"
        
        # Check if working directory is clean or stash
        if [[ -n $(git status --porcelain) ]]; then
            log_warn "Uncommitted local changes detected in working directory."
        fi
        
        log_info "Resetting working directory to origin/${BRANCH}..."
        git reset --hard "origin/${BRANCH}"
        CURRENT_COMMIT=$(git rev-parse --short HEAD)
        log_success "Repository updated to commit ${CURRENT_COMMIT}"
    else
        log_warn "Current directory is not a Git repository. Skipping git pull."
    fi
else
    log_info "Skipping Git pull as requested (--skip-git)."
fi

# ------------------------------------------------------------------------------
# 2. Deploy Backend
# ------------------------------------------------------------------------------
if [[ "$SKIP_BACKEND" = false ]]; then
    log_step "Executing Backend Deployment"
    BACKEND_FLAGS=()
    if [[ "$RUN_SEED" = true ]]; then
        BACKEND_FLAGS+=("--seed")
    fi
    bash "${SCRIPT_DIR}/deploy-backend.sh" "${BACKEND_FLAGS[@]}"
else
    log_info "Skipping Backend deployment as requested (--skip-backend)."
fi

# ------------------------------------------------------------------------------
# 3. Deploy Frontend
# ------------------------------------------------------------------------------
if [[ "$SKIP_FRONTEND" = false ]]; then
    log_step "Executing Frontend Deployment"
    bash "${SCRIPT_DIR}/deploy-frontend.sh"
else
    log_info "Skipping Frontend deployment as requested (--skip-frontend)."
fi

# ------------------------------------------------------------------------------
# 4. Health Verification
# ------------------------------------------------------------------------------
if [[ "$SKIP_HEALTH" = false ]]; then
    log_step "Running Comprehensive Health Checks"
    bash "${SCRIPT_DIR}/health-check.sh"
else
    log_info "Skipping Health Check as requested (--skip-health)."
fi

# ------------------------------------------------------------------------------
# Summary & Timing
# ------------------------------------------------------------------------------
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "\n${COLOR_BOLD}${COLOR_GREEN}=================================================================${COLOR_RESET}"
echo -e "${COLOR_BOLD}${COLOR_GREEN}   WINVINAYA FOUNDATION DEPLOYMENT COMPLETED SUCCESSFULLY!       ${COLOR_RESET}"
echo -e "${COLOR_BOLD}${COLOR_GREEN}=================================================================${COLOR_RESET}"
log_info "Total Deployment Time: ${DURATION} seconds"
log_info "Application URL     : https://${NGINX_SITE_NAME}"
log_info "Health Endpoint     : ${HEALTH_ENDPOINT}"
echo ""
