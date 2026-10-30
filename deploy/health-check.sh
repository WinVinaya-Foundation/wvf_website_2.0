#!/usr/bin/env bash
# ==============================================================================
# WinVinaya Foundation - Health Check & System Diagnostics
# Location: deploy/health-check.sh
# Usage: ./deploy/health-check.sh [--verbose] [--json]
# ==============================================================================

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=deploy/common.sh
source "${SCRIPT_DIR}/common.sh"

VERBOSE=false
JSON_OUTPUT=false

for arg in "$@"; do
    case $arg in
        --verbose|-v)
            VERBOSE=true
            shift
            ;;
        --json)
            JSON_OUTPUT=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --verbose, -v  Show detailed diagnostic output"
            echo "  --json         Output health results in JSON format"
            echo "  --help, -h     Show this help message"
            exit 0
            ;;
    esac
done

TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0

check_result() {
    local name="$1"
    local status="$2"
    local details="$3"

    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [[ "$status" == "PASS" ]]; then
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
        if [[ "$JSON_OUTPUT" = false ]]; then
            echo -e "  [${COLOR_GREEN} PASS ${COLOR_RESET}] ${name} - ${details}"
        fi
    elif [[ "$status" == "WARN" ]]; then
        if [[ "$JSON_OUTPUT" = false ]]; then
            echo -e "  [${COLOR_YELLOW} WARN ${COLOR_RESET}] ${name} - ${details}"
        fi
    else
        FAILED_CHECKS=$((FAILED_CHECKS + 1))
        if [[ "$JSON_OUTPUT" = false ]]; then
            echo -e "  [${COLOR_RED} FAIL ${COLOR_RESET}] ${name} - ${details}"
        fi
    fi
}

if [[ "$JSON_OUTPUT" = false ]]; then
    echo -e "${COLOR_BOLD}${COLOR_BLUE}======================================================${COLOR_RESET}"
    echo -e "${COLOR_BOLD}   WinVinaya Foundation — System & Service Health    ${COLOR_RESET}"
    echo -e "${COLOR_BOLD}${COLOR_BLUE}======================================================${COLOR_RESET}"
    echo -e " Timestamp: $(date '+%Y-%m-%d %H:%M:%S %Z')\n"
fi

# 1. Check Backend Local HTTP Health Endpoint
BACKEND_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${HEALTH_ENDPOINT}" 2>/dev/null || echo "000")
if [[ "$BACKEND_HTTP_CODE" -eq 200 ]]; then
    check_result "Backend API (Local)" "PASS" "HTTP 200 on ${HEALTH_ENDPOINT}"
else
    check_result "Backend API (Local)" "FAIL" "HTTP ${BACKEND_HTTP_CODE} on ${HEALTH_ENDPOINT}"
fi

# 2. Check PM2 Process Status
if command -v pm2 &>/dev/null; then
    PM2_STATUS=$(pm2 jlist 2>/dev/null | grep -o "\"name\":\"${PM2_APP_NAME}\",\"pm_id\":[0-9]*,\"monit\":{[^}]*},\"pm2_env\":{[^}]*\"status\":\"[^\"]*\"" | grep -o "\"status\":\"[^\"]*\"" | cut -d'"' -f4 || echo "unknown")
    
    if [[ "$PM2_STATUS" == "online" ]]; then
        check_result "PM2 Process (${PM2_APP_NAME})" "PASS" "Process is online and running"
    elif [[ -z "$PM2_STATUS" || "$PM2_STATUS" == "unknown" ]]; then
        if pm2 describe "${PM2_APP_NAME}" &>/dev/null; then
            check_result "PM2 Process (${PM2_APP_NAME})" "PASS" "Process exists in PM2"
        else
            check_result "PM2 Process (${PM2_APP_NAME})" "FAIL" "Process not found in PM2 list"
        fi
    else
        check_result "PM2 Process (${PM2_APP_NAME})" "FAIL" "Status is '${PM2_STATUS}'"
    fi
else
    check_result "PM2 Daemon" "WARN" "PM2 command not found on PATH"
fi

# 3. Check PostgreSQL Database
if command -v pg_isready &>/dev/null; then
    if pg_isready -q; then
        check_result "PostgreSQL Database" "PASS" "PostgreSQL is accepting connections"
    else
        check_result "PostgreSQL Database" "FAIL" "PostgreSQL connection refused"
    fi
elif command -v systemctl &>/dev/null && systemctl is-active --quiet postgresql 2>/dev/null; then
    check_result "PostgreSQL Database" "PASS" "postgresql systemd service is active"
else
    check_result "PostgreSQL Database" "WARN" "Could not verify directly via pg_isready/systemd"
fi

# 4. Check Nginx Web Server
if command -v systemctl &>/dev/null; then
    if systemctl is-active --quiet nginx 2>/dev/null; then
        check_result "Nginx Web Server" "PASS" "nginx systemd service is active"
    else
        check_result "Nginx Web Server" "FAIL" "nginx service is inactive or failed"
    fi
elif command -v nginx &>/dev/null; then
    if nginx -t >/dev/null 2>&1; then
        check_result "Nginx Configuration" "PASS" "Nginx syntax is valid"
    else
        check_result "Nginx Configuration" "FAIL" "Nginx syntax test failed"
    fi
else
    check_result "Nginx Web Server" "WARN" "Nginx service or binary not found"
fi

# 5. Check Frontend Build Static Files
if [[ -f "${FRONTEND_DIR}/dist/index.html" ]]; then
    DIST_SIZE=$(du -sh "${FRONTEND_DIR}/dist" 2>/dev/null | cut -f1 || echo "OK")
    check_result "Frontend Production Build" "PASS" "dist/index.html exists (${DIST_SIZE})"
else
    check_result "Frontend Production Build" "FAIL" "${FRONTEND_DIR}/dist/index.html is missing"
fi

# 6. Check Public Domain Health (Optional)
PUBLIC_DOMAIN="https://${NGINX_SITE_NAME}/api/health"
PUBLIC_HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${PUBLIC_DOMAIN}" 2>/dev/null || echo "000")
if [[ "$PUBLIC_HTTP_CODE" -eq 200 ]]; then
    check_result "Public HTTPS Domain" "PASS" "HTTP 200 on ${PUBLIC_DOMAIN}"
elif [[ "$PUBLIC_HTTP_CODE" -eq 000 ]]; then
    check_result "Public HTTPS Domain" "WARN" "Unreachable or DNS not pointed locally (HTTP ${PUBLIC_HTTP_CODE})"
else
    check_result "Public HTTPS Domain" "WARN" "HTTP ${PUBLIC_HTTP_CODE} on ${PUBLIC_DOMAIN}"
fi

# 7. System Resources (Disk & Memory)
if command -v df &>/dev/null; then
    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
    if [[ -n "$DISK_USAGE" && "$DISK_USAGE" -lt 85 ]]; then
        check_result "System Disk Space (/)" "PASS" "${DISK_USAGE}% used"
    elif [[ -n "$DISK_USAGE" && "$DISK_USAGE" -lt 95 ]]; then
        check_result "System Disk Space (/)" "WARN" "${DISK_USAGE}% used (High usage)"
    elif [[ -n "$DISK_USAGE" ]]; then
        check_result "System Disk Space (/)" "FAIL" "${DISK_USAGE}% used (Critical!)"
    fi
fi

if [[ "$VERBOSE" = true ]]; then
    echo -e "\n${COLOR_BOLD}Detailed Diagnostics:${COLOR_RESET}"
    echo "  Node.js Version: $(node -v 2>/dev/null || echo 'N/A')"
    echo "  NPM Version:     $(npm -v 2>/dev/null || echo 'N/A')"
    if command -v pm2 &>/dev/null; then
        echo -e "\n  PM2 Process Table:"
        pm2 list || true
    fi
    if command -v free &>/dev/null; then
        echo -e "\n  System Memory Usage:"
        free -h || true
    fi
fi

if [[ "$JSON_OUTPUT" = true ]]; then
    echo "{\"total\": $TOTAL_CHECKS, \"passed\": $PASSED_CHECKS, \"failed\": $FAILED_CHECKS, \"status\": \"$([[ $FAILED_CHECKS -eq 0 ]] && echo 'healthy' || echo 'unhealthy')\"}"
else
    echo -e "\n${COLOR_BOLD}${COLOR_BLUE}------------------------------------------------------${COLOR_RESET}"
    if [[ "$FAILED_CHECKS" -eq 0 ]]; then
        echo -e "${COLOR_GREEN}${COLOR_BOLD}All Health Checks Passed! (${PASSED_CHECKS}/${TOTAL_CHECKS})${COLOR_RESET}\n"
        exit 0
    else
        echo -e "${COLOR_RED}${COLOR_BOLD}Health Checks Failed! (${FAILED_CHECKS} failed, ${PASSED_CHECKS} passed)${COLOR_RESET}\n"
        exit 1
    fi
fi
