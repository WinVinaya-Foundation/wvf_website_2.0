#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Shared Deployment Utilities & Helper Functions
# Location: deploy/common.sh
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -eo pipefail

# ------------------------------------------------------------------------------
# Directory Resolution
# ------------------------------------------------------------------------------
# Resolve deploy directory and project root automatically
DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"
NGINX_DIR="${PROJECT_ROOT}/nginx"

# Default configuration
PM2_APP_NAME="${PM2_APP_NAME:-wvf-backend}"
BACKEND_PORT="${PORT:-4000}"
HEALTH_ENDPOINT="http://localhost:${BACKEND_PORT}/api/health"
NGINX_SITE_NAME="winvinayafoundation.org"

# ------------------------------------------------------------------------------
# Color Codes & Logging Helpers
# ------------------------------------------------------------------------------
if [[ -t 1 ]]; then
    COLOR_RESET="\033[0m"
    COLOR_BOLD="\033[1m"
    COLOR_GREEN="\033[32m"
    COLOR_BLUE="\033[34m"
    COLOR_CYAN="\033[36m"
    COLOR_YELLOW="\033[33m"
    COLOR_RED="\033[31m"
    COLOR_GRAY="\033[90m"
else
    COLOR_RESET=""
    COLOR_BOLD=""
    COLOR_GREEN=""
    COLOR_BLUE=""
    COLOR_CYAN=""
    COLOR_YELLOW=""
    COLOR_RED=""
    COLOR_GRAY=""
fi

log_info() {
    echo -e "${COLOR_CYAN}[INFO]${COLOR_RESET} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_success() {
    echo -e "${COLOR_GREEN}[SUCCESS]${COLOR_RESET} [$(date '+%Y-%m-%d %H:%M:%S')] ${COLOR_BOLD}$1${COLOR_RESET}"
}

log_warn() {
    echo -e "${COLOR_YELLOW}[WARN]${COLOR_RESET} [$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    echo -e "${COLOR_RED}[ERROR]${COLOR_RESET} [$(date '+%Y-%m-%d %H:%M:%S')] ${COLOR_BOLD}$1${COLOR_RESET}" >&2
}

log_step() {
    echo -e "\n${COLOR_BLUE}${COLOR_BOLD}===> $1${COLOR_RESET}"
}

# ------------------------------------------------------------------------------
# Requirement Checks
# ------------------------------------------------------------------------------
require_cmd() {
    local cmd="$1"
    if ! command -v "$cmd" &> /dev/null; then
        log_error "Required command '$cmd' is not installed or not in PATH."
        exit 1
    fi
}

check_system_prerequisites() {
    require_cmd "node"
    require_cmd "npm"
    require_cmd "git"
    require_cmd "curl"
}
