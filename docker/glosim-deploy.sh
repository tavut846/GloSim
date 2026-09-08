#!/usr/bin/env bash

# ==============================================================================
# GloSim VPS Deployment & Management Tool
# Repository: https://github.com/tavut846/GloSim
# ==============================================================================

set -e

# Resolve script root directory
if [ -n "${BASH_SOURCE[0]}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)"
  # If run from repository's docker/ directory, resolve to project root
  if [ "$(basename "$PROJECT_DIR")" = "docker" ] && [ -f "$PROJECT_DIR/../.env.example" ]; then
    PROJECT_DIR="$(cd "$PROJECT_DIR/.." && pwd)"
  fi
else
  PROJECT_DIR="/opt/glosim"
fi

# If invoked in an empty directory or outside a GloSim installation, default to /opt/glosim
if [ ! -f "$PROJECT_DIR/docker-compose.yml" ] && [ ! -f "$PROJECT_DIR/docker/docker-compose.yml" ]; then
  if [ -d "/opt/glosim" ] && [ -f "/opt/glosim/docker-compose.yml" ]; then
    PROJECT_DIR="/opt/glosim"
  elif [ "$PROJECT_DIR" = "/tmp" ] || [ "$PROJECT_DIR" = "$HOME" ] || [ "$PROJECT_DIR" = "/root" ]; then
    PROJECT_DIR="/opt/glosim"
  fi
fi

mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# ANSI Colors
BOLD="\033[1m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
RESET="\033[0m"

# Print helpers
info() { echo -e "${CYAN}[INFO]${RESET} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${RESET} $1"; }
warn() { echo -e "${YELLOW}[WARN]${RESET} $1"; }
error() { echo -e "${RED}[ERROR]${RESET} $1"; }
title() { echo -e "\n${BOLD}${BLUE}=== $1 ===${RESET}"; }

# Download and extract latest release package from GitHub
download_and_extract_release() {
  info "Querying latest release from GitHub API (tavut846/GloSim)..."
  local api_url="https://api.github.com/repos/tavut846/GloSim/releases"
  local release_json
  release_json=$(curl -sSL -H "Accept: application/vnd.github+json" "$api_url" || true)

  if [ -z "$release_json" ] || echo "$release_json" | grep -q "Not Found"; then
    error "Unable to fetch release information from GitHub."
    return 1
  fi

  local download_url
  download_url=$(echo "$release_json" | grep -o 'https://[^"]*glosim\.zip' | head -n1 || true)
  local tag_name
  tag_name=$(echo "$release_json" | grep -o '"tag_name": *"[^"]*"' | head -n1 | cut -d'"' -f4 || true)

  if [ -z "$download_url" ]; then
    error "No glosim.zip asset found in latest releases."
    return 1
  fi

  info "Found release: ${BOLD}$tag_name${RESET}"
  info "Downloading release package from $download_url..."

  local tmp_zip="/tmp/glosim_release.zip"
  rm -f "$tmp_zip"
  curl -fSL "$download_url" -o "$tmp_zip"

  info "Extracting bundle into $PROJECT_DIR..."
  if ! command -v unzip >/dev/null 2>&1; then
    warn "unzip command not found. Installing unzip..."
    if command -v apt-get >/dev/null 2>&1; then
      apt-get update && apt-get install -y unzip
    elif command -v yum >/dev/null 2>&1; then
      yum install -y unzip
    fi
  fi
  unzip -o "$tmp_zip" -d "$PROJECT_DIR"
  rm -f "$tmp_zip"
  success "Downloaded and extracted GloSim $tag_name."
}

# Detect Docker Compose Command (v2 plugin or standalone v1)
get_compose_cmd() {
  if docker compose version >/dev/null 2>&1; then
    echo "docker compose"
  elif command -v docker-compose >/dev/null 2>&1; then
    echo "docker-compose"
  else
    echo ""
  fi
}

DOCKER_COMPOSE="$(get_compose_cmd)"

# Check Docker Environment
check_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    error "Docker is not installed on this system. Please install Docker first."
    echo "  Ubuntu/Debian installation: curl -fsSL https://get.docker.com | sh"
    return 1
  fi

  if [ -z "$DOCKER_COMPOSE" ]; then
    error "Docker Compose is not installed. Please install docker-compose-plugin."
    echo "  Ubuntu/Debian installation: apt-get update && apt-get install -y docker-compose-plugin"
    return 1
  fi
  return 0
}

# Detect Server Public IP
get_server_ip() {
  local ip
  ip=$(curl -s4 --max-time 3 https://ifconfig.me 2>/dev/null || \
       curl -s4 --max-time 3 https://api.ipify.org 2>/dev/null || \
       hostname -I | awk '{print $1}' 2>/dev/null || \
       echo "127.0.0.1")
  echo "$ip"
}

# Get GloSim Version
get_version() {
  local ver="0.0.1"
  if [ -f "backend/package.json" ]; then
    ver=$(grep -o '"version": *"[^"]*"' backend/package.json | head -n1 | cut -d'"' -f4)
  elif [ -f "package.json" ]; then
    ver=$(grep -o '"version": *"[^"]*"' package.json | head -n1 | cut -d'"' -f4)
  fi
  echo "$ver"
}

# ------------------------------------------------------------------------------
# Security Secret Generation & Management Helpers (Strapi Keys)
# ------------------------------------------------------------------------------

# Helper function to generate secure base64 secret string
generate_random_secret() {
  local length="${1:-32}"
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -base64 "$length" | tr -d '\r\n'
  else
    head -c "$length" /dev/urandom | base64 | tr -d '\r\n'
  fi
}

# Helper function to generate 4 comma-separated Strapi app keys
generate_app_keys() {
  local k1 k2 k3 k4
  k1=$(generate_random_secret 16)
  k2=$(generate_random_secret 16)
  k3=$(generate_random_secret 16)
  k4=$(generate_random_secret 16)
  echo "${k1},${k2},${k3},${k4}"
}

# Function to set or replace key-value in .env file
update_env_var() {
  local key="$1"
  local value="$2"
  local env_file="${3:-.env}"

  if grep -q "^${key}=" "$env_file" 2>/dev/null; then
    # Escape special characters for sed replacement
    local escaped_val
    escaped_val=$(printf '%s\n' "$value" | sed -e 's/[\/&]/\\&/g')
    sed -i "s|^${key}=.*|${key}=${escaped_val}|" "$env_file" 2>/dev/null || \
    sed -i "s/^${key}=.*/${key}=${escaped_val}/" "$env_file"
  else
    echo "${key}=${value}" >> "$env_file"
  fi
}

# Helper to check if a secret is missing, empty, or set to placeholder default
needs_generation() {
  local key="$1"
  local default_val="$2"
  local env_file="${3:-.env}"
  local current_val
  current_val=$(grep "^${key}=" "$env_file" 2>/dev/null | cut -d'=' -f2- | tr -d '\r\n' || true)

  if [ -z "$current_val" ] || [ "$current_val" = "$default_val" ]; then
    return 0
  else
    return 1
  fi
}

# Verify and auto-generate fresh cryptographic secrets if missing or using default placeholders
ensure_security_secrets() {
  local env_file="${1:-.env}"
  [ ! -f "$env_file" ] && return 0

  info "Checking Strapi backend application security keys..."

  # Check and generate APP_KEYS
  if needs_generation "APP_KEYS" "Gl0S1mAppKeyAlpha,Gl0S1mAppKeyBeta,Gl0S1mAppKeyGamma,Gl0S1mAppKeyDelta" "$env_file"; then
    local new_app_keys
    new_app_keys=$(generate_app_keys)
    update_env_var "APP_KEYS" "$new_app_keys" "$env_file"
    success "Generated fresh, cryptographically secure APP_KEYS"
  else
    info "APP_KEYS already securely configured"
  fi

  # Check and generate API_TOKEN_SALT
  if needs_generation "API_TOKEN_SALT" "glosim_api_token_salt_random_sec_key" "$env_file"; then
    local new_salt
    new_salt=$(generate_random_secret 16)
    update_env_var "API_TOKEN_SALT" "$new_salt" "$env_file"
    success "Generated fresh API_TOKEN_SALT"
  else
    info "API_TOKEN_SALT already securely configured"
  fi

  # Check and generate ADMIN_JWT_SECRET
  if needs_generation "ADMIN_JWT_SECRET" "glosim_admin_jwt_secret_random_sec" "$env_file"; then
    local new_admin_jwt
    new_admin_jwt=$(generate_random_secret 32)
    update_env_var "ADMIN_JWT_SECRET" "$new_admin_jwt" "$env_file"
    success "Generated fresh ADMIN_JWT_SECRET"
  else
    info "ADMIN_JWT_SECRET already securely configured"
  fi

  # Check and generate TRANSFER_TOKEN_SALT
  if needs_generation "TRANSFER_TOKEN_SALT" "glosim_transfer_salt_random_sec" "$env_file"; then
    local new_transfer_salt
    new_transfer_salt=$(generate_random_secret 16)
    update_env_var "TRANSFER_TOKEN_SALT" "$new_transfer_salt" "$env_file"
    success "Generated fresh TRANSFER_TOKEN_SALT"
  else
    info "TRANSFER_TOKEN_SALT already securely configured"
  fi

  # Check and generate JWT_SECRET
  if needs_generation "JWT_SECRET" "glosim_main_jwt_secret_random_sec_123" "$env_file"; then
    local new_jwt
    new_jwt=$(generate_random_secret 32)
    update_env_var "JWT_SECRET" "$new_jwt" "$env_file"
    success "Generated fresh JWT_SECRET"
  else
    info "JWT_SECRET already securely configured"
  fi

  chmod 600 "$env_file" 2>/dev/null || true
  success "Environment variables and security secrets verified in $env_file"
}

# Interactive configuration of Strapi security keys
configure_security_keys() {
  title "Configure Application Security Keys"
  local env_file="${1:-.env}"
  if [ ! -f "$env_file" ]; then
    warn "No $env_file file found. Initializing from .env.example..."
    [ -f ".env.example" ] && cp .env.example "$env_file" || touch "$env_file"
  fi

  echo "Strapi security keys can be automatically verified or regenerated:"
  echo "  1) Check & replace only default/empty keys with secure random keys (Recommended)"
  echo "  2) Force re-generate ALL Strapi security keys (Warning: will invalidate existing admin/user JWT sessions)"
  echo "  0) Back / Cancel"
  read -rp "Select option [1-2, 0 to cancel]: " key_choice

  case "$key_choice" in
    1)
      ensure_security_secrets "$env_file"
      ;;
    2)
      read -rp "Are you sure you want to regenerate all Strapi keys? [y/N]: " confirm_regen
      if [[ "$confirm_regen" =~ ^[yY]([eE][sS])?$ ]]; then
        update_env_var "APP_KEYS" "$(generate_app_keys)" "$env_file"
        update_env_var "API_TOKEN_SALT" "$(generate_random_secret 16)" "$env_file"
        update_env_var "ADMIN_JWT_SECRET" "$(generate_random_secret 32)" "$env_file"
        update_env_var "TRANSFER_TOKEN_SALT" "$(generate_random_secret 16)" "$env_file"
        update_env_var "JWT_SECRET" "$(generate_random_secret 32)" "$env_file"
        chmod 600 "$env_file" 2>/dev/null || true
        success "Force-regenerated all security keys in $env_file!"
      else
        info "Cancelled key regeneration."
      fi
      ;;
    0)
      info "Key configuration cancelled."
      ;;
    *)
      warn "Invalid choice."
      ;;
  esac
}

# ------------------------------------------------------------------------------
# 1. Add command 'glosim' to VPS
# ------------------------------------------------------------------------------
add_glosim_command() {
  title "Add 'glosim' Command to VPS"
  local target_bin="/usr/local/bin/glosim"
  local script_path="$PROJECT_DIR/glosim-deploy.sh"

  # If glosim-deploy.sh is not present in PROJECT_DIR (e.g. run via curl pipe), save a copy locally
  if [ ! -f "$script_path" ]; then
    info "Saving glosim-deploy.sh to $PROJECT_DIR..."
    curl -fsSL https://raw.githubusercontent.com/tavut846/GloSim/main/docker/glosim-deploy.sh -o "$script_path" 2>/dev/null || true
  fi

  chmod +x "$script_path" 2>/dev/null || true

  if [ "$EUID" -ne 0 ] && ! command -v sudo >/dev/null 2>&1; then
    error "Root or sudo privileges are required to create $target_bin."
    return 1
  fi

  local SUDO=""
  if [ "$EUID" -ne 0 ]; then
    SUDO="sudo"
  fi

  info "Installing global shortcut to $target_bin..."
  $SUDO bash -c "cat << 'EOF' > $target_bin
#!/usr/bin/env bash
exec \"$script_path\" \"\$@\"
EOF"

  $SUDO chmod +x "$target_bin"

  success "'glosim' command installed successfully!"
  echo -e "You can now run ${BOLD}glosim${RESET} from any directory to open the management menu."
}

# ------------------------------------------------------------------------------
# 2. Deploy / Start GloSim
# ------------------------------------------------------------------------------
deploy_services() {
  title "Deploying GloSim Services"
  check_docker || return 1

  # If docker-compose.yml does not exist in PROJECT_DIR, auto-download release
  if [ ! -f "docker-compose.yml" ]; then
    info "GloSim deployment files not found in $PROJECT_DIR."
    info "Automatically fetching latest pre-release from GitHub..."
    download_and_extract_release || return 1
    add_glosim_command 2>/dev/null || true
  fi

  # Ensure .env exists
  if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
      info "No .env found. Initializing from .env.example (defaults to SQLite)..."
      cp .env.example .env
    else
      warn "Neither .env nor .env.example found. Creating minimal default .env..."
      cat << 'EOF' > .env
FRONTEND_PORT=5173
BACKEND_PORT=1337
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
APP_KEYS=Gl0S1mAppKeyAlpha,Gl0S1mAppKeyBeta,Gl0S1mAppKeyGamma,Gl0S1mAppKeyDelta
API_TOKEN_SALT=glosim_api_token_salt_random_sec_key
ADMIN_JWT_SECRET=glosim_admin_jwt_secret_random_sec
TRANSFER_TOKEN_SALT=glosim_transfer_salt_random_sec
JWT_SECRET=glosim_main_jwt_secret_random_sec_123
EOF
    fi
  fi

  # Verify and replace default security keys with secure random values
  ensure_security_secrets ".env"

  # Create storage directories
  mkdir -p backend/.tmp

  info "Starting containers using $DOCKER_COMPOSE..."
  $DOCKER_COMPOSE up -d --build

  success "Containers built and launched successfully!"
  echo ""
  show_status
}

# ------------------------------------------------------------------------------
# 3. Uninstall GloSim (Keep database untouched)
# ------------------------------------------------------------------------------
uninstall_services() {
  title "Uninstall GloSim (Database Untouched)"
  check_docker || return 1

  echo -e "${YELLOW}Warning: This will stop and remove GloSim containers and network.${RESET}"
  echo -e "${GREEN}Note: Your SQLite database (backend/.tmp/data.db) and uploaded files will remain untouched.${RESET}"
  echo ""
  read -rp "Are you sure you want to proceed? [y/N]: " confirm
  case "$confirm" in
    [yY][eE][sS]|[yY])
      info "Stopping and removing containers..."
      $DOCKER_COMPOSE down

      read -rp "Would you like to remove GloSim Docker images as well? [y/N]: " rm_img
      case "$rm_img" in
        [yY][eE][sS]|[yY])
          info "Removing GloSim Docker images..."
          docker rmi glosim-backend glosim-frontend 2>/dev/null || true
          ;;
      esac

      if [ -f "/usr/local/bin/glosim" ]; then
        read -rp "Would you like to remove the global 'glosim' CLI command? [y/N]: " rm_cli
        case "$rm_cli" in
          [yY][eE][sS]|[yY])
            local SUDO=""
            [ "$EUID" -ne 0 ] && SUDO="sudo"
            $SUDO rm -f /usr/local/bin/glosim
            info "Removed /usr/local/bin/glosim."
            ;;
        esac
      fi

      success "Uninstall complete! Database & persistent files preserved in: $PROJECT_DIR"
      ;;
    *)
      info "Uninstall aborted."
      ;;
  esac
}

# ------------------------------------------------------------------------------
# 4. Remove Logs
# ------------------------------------------------------------------------------
remove_logs() {
  title "Clear Application & Container Logs"

  info "Clearing Docker container logs..."
  local containers=("glosim-backend" "glosim-frontend")
  local cleared=0

  for c in "${containers[@]}"; do
    if docker ps -a --format '{{.Names}}' | grep -Eq "^${c}\$"; then
      local log_file
      log_file=$(docker inspect --format='{{.LogPath}}' "$c" 2>/dev/null || true)
      if [ -n "$log_file" ] && [ -f "$log_file" ]; then
        truncate -s 0 "$log_file" 2>/dev/null || : > "$log_file" 2>/dev/null || true
        info "Truncated log for container: $c"
        cleared=$((cleared + 1))
      fi
    fi
  done

  info "Cleaning local temporary log files..."
  find . -maxdepth 3 -type f -name "*.log" -not -path "*/.git/*" -delete 2>/dev/null || true

  success "Logs cleared successfully ($cleared container log streams truncated)!"
}

# ------------------------------------------------------------------------------
# 5. Update (Pre-Release or Latest from GitHub)
# ------------------------------------------------------------------------------
update_services() {
  title "Update GloSim Platform"
  check_docker || return 1

  echo "Select update source:"
  echo "  1) Pull latest Pre-Release / Release package from GitHub (Recommended)"
  echo "  2) Git pull (If this deployment is a cloned Git repository)"
  echo "  0) Cancel"
  read -rp "Select option [1-2, 0 to cancel]: " upd_choice

  case "$upd_choice" in
    1)
      info "Querying latest release from GitHub API (tavut846/GloSim)..."
      local api_url="https://api.github.com/repos/tavut846/GloSim/releases"
      local release_json
      release_json=$(curl -sSL -H "Accept: application/vnd.github+json" "$api_url" || true)

      if [ -z "$release_json" ] || echo "$release_json" | grep -q "Not Found"; then
        error "Unable to fetch release information from GitHub."
        return 1
      fi

      # Find glosim.zip browser_download_url
      local download_url
      download_url=$(echo "$release_json" | grep -o 'https://[^"]*glosim\.zip' | head -n1 || true)
      local tag_name
      tag_name=$(echo "$release_json" | grep -o '"tag_name": *"[^"]*"' | head -n1 | cut -d'"' -f4 || true)

      if [ -z "$download_url" ]; then
        error "No glosim.zip asset found in the latest releases."
        return 1
      fi

      info "Found release: ${BOLD}$tag_name${RESET}"
      info "Asset URL: $download_url"
      read -rp "Proceed with downloading and applying this update? [y/N]: " confirm_upd
      if [[ ! "$confirm_upd" =~ ^[yY]([eE][sS])?$ ]]; then
        info "Update cancelled."
        return 0
      fi

      # 1. Backup persistent data
      local backup_dir="/tmp/glosim_backup_$(date +%s)"
      mkdir -p "$backup_dir"
      info "Backing up configuration and SQLite database to $backup_dir..."
      [ -f ".env" ] && cp .env "$backup_dir/"
      [ -d "backend/.tmp" ] && cp -r backend/.tmp "$backup_dir/"

      # 2. Download and extract new bundle
      download_and_extract_release || return 1

      # 3. Restore configuration and database
      info "Restoring configuration and database..."
      [ -f "$backup_dir/.env" ] && cp "$backup_dir/.env" .env
      if [ -d "$backup_dir/.tmp" ]; then
        mkdir -p backend/.tmp
        cp -r "$backup_dir/.tmp/"* backend/.tmp/ 2>/dev/null || true
      fi
      rm -rf "$backup_dir"

      chmod +x glosim-deploy.sh 2>/dev/null || true

      # Ensure secrets are secure in restored environment
      ensure_security_secrets ".env"

      # 5. Rebuild and restart containers
      info "Rebuilding and restarting updated containers..."
      $DOCKER_COMPOSE up -d --build

      success "GloSim successfully updated to $tag_name!"
      show_status
      ;;

    2)
      if [ ! -d ".git" ]; then
        error "This directory is not a Git repository. Use option 1 (Download Release Package) instead."
        return 1
      fi
      info "Pulling latest changes via git..."
      git pull
      ensure_security_secrets ".env"
      info "Rebuilding and restarting containers..."
      $DOCKER_COMPOSE up -d --build
      success "Update complete via Git pull!"
      show_status
      ;;

    0)
      info "Update cancelled."
      ;;
    *)
      warn "Invalid option selected."
      ;;
  esac
}

# ------------------------------------------------------------------------------
# 6. Show Status
# ------------------------------------------------------------------------------
show_status() {
  title "GloSim Platform Status"
  local ver
  ver=$(get_version)
  local ip
  ip=$(get_server_ip)

  # Load ports from .env if present
  local fe_port="5173"
  local be_port="1337"
  local db_client="sqlite"
  if [ -f ".env" ]; then
    fe_port=$(grep -E '^FRONTEND_PORT=' .env | cut -d'=' -f2 | tr -d ' "\r' || echo "5173")
    be_port=$(grep -E '^BACKEND_PORT=' .env | cut -d'=' -f2 | tr -d ' "\r' || echo "1337")
    db_client=$(grep -E '^DATABASE_CLIENT=' .env | cut -d'=' -f2 | tr -d ' "\r' || echo "sqlite")
  fi
  [ -z "$fe_port" ] && fe_port="5173"
  [ -z "$be_port" ] && be_port="1337"

  echo -e "Platform Version:  ${BOLD}${GREEN}v${ver}${RESET}"
  echo -e "Database Engine:   ${BOLD}${CYAN}${db_client}${RESET}"
  echo -e "Server Public IP:  ${BOLD}${YELLOW}${ip}${RESET}"
  echo ""

  # Container status
  if [ -n "$DOCKER_COMPOSE" ]; then
    echo -e "${BOLD}Docker Containers:${RESET}"
    $DOCKER_COMPOSE ps || docker ps --filter "name=glosim"
  else
    warn "Docker Compose is not available."
  fi
  echo ""

  # Endpoint checks
  echo -e "${BOLD}Service Health Checks:${RESET}"
  local fe_status
  fe_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://127.0.0.1:${fe_port}" 2>/dev/null || echo "DOWN")
  local be_status
  be_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://127.0.0.1:${be_port}/admin" 2>/dev/null || echo "DOWN")

  if [ "$fe_status" = "200" ] || [ "$fe_status" = "304" ]; then
    echo -e "  Frontend Web App:  ${GREEN}● ONLINE${RESET} (HTTP $fe_status)"
  else
    echo -e "  Frontend Web App:  ${RED}● OFFLINE / STARTING${RESET} (Status: $fe_status)"
  fi

  if [ "$be_status" = "200" ] || [ "$be_status" = "204" ] || [ "$be_status" = "302" ]; then
    echo -e "  Strapi CMS Admin:  ${GREEN}● ONLINE${RESET} (HTTP $be_status)"
  else
    echo -e "  Strapi CMS Admin:  ${RED}● OFFLINE / STARTING${RESET} (Status: $be_status)"
  fi
  echo ""

  # Access URLs
  echo -e "${BOLD}Access Endpoints:${RESET}"
  echo -e "  🌐 Frontend Web Application: ${CYAN}http://${ip}:${fe_port}${RESET}"
  echo -e "  ⚙️  Strapi CMS Admin Panel:   ${CYAN}http://${ip}:${be_port}/admin${RESET}"
  echo -e "  📡 Strapi REST API Base:     ${CYAN}http://${ip}:${be_port}/api${RESET}"
  echo ""
}

# ------------------------------------------------------------------------------
# 7. Interactive Menu
# ------------------------------------------------------------------------------
show_menu() {
  while true; do
    local ver
    ver=$(get_version)
    echo -e "${BOLD}${BLUE}====================================================${RESET}"
    echo -e "${BOLD}        GloSim Management & Deployment Tool        ${RESET}"
    echo -e "${BOLD}        Repository: https://github.com/tavut846/GloSim${RESET}"
    echo -e "${BOLD}${BLUE}====================================================${RESET}"
    echo -e "Current Version: ${GREEN}v${ver}${RESET} | Directory: ${CYAN}${PROJECT_DIR}${RESET}"
    echo -e "----------------------------------------------------"
    echo -e " ${BOLD}1)${RESET} Add 'glosim' command to VPS (access from anywhere)"
    echo -e " ${BOLD}2)${RESET} Deploy / Start GloSim (docker compose up -d --build)"
    echo -e " ${BOLD}3)${RESET} Uninstall GloSim (database & uploaded media preserved)"
    echo -e " ${BOLD}4)${RESET} Clear Container Logs"
    echo -e " ${BOLD}5)${RESET} Update GloSim (Latest Pre-Release or Git Pull)"
    echo -e " ${BOLD}6)${RESET} View Platform & Container Status"
    echo -e " ${BOLD}7)${RESET} Configure / Secure Strapi Application Keys"
    echo -e " ${BOLD}0)${RESET} Exit"
    echo -e "----------------------------------------------------"
    read -rp "Please select an option [0-7]: " choice

    case "$choice" in
      1) add_glosim_command ;;
      2) deploy_services ;;
      3) uninstall_services ;;
      4) remove_logs ;;
      5) update_services ;;
      6) show_status ;;
      7) configure_security_keys ;;
      0) echo "Goodbye!"; exit 0 ;;
      *) warn "Invalid choice. Please select 0-7." ;;
    esac

    echo ""
    read -rp "Press [Enter] to return to the menu..." dummy
    clear || echo ""
  done
}

# CLI Argument Dispatcher
case "$1" in
  install-cli|add-cmd)
    add_glosim_command
    ;;
  deploy|start|up)
    deploy_services
    ;;
  uninstall|down)
    uninstall_services
    ;;
  logs|clean-logs|remove-log)
    remove_logs
    ;;
  update|upgrade)
    update_services
    ;;
  status|ps)
    show_status
    ;;
  secrets|gen-keys|security)
    configure_security_keys "${2:-.env}"
    ;;
  menu|"")
    show_menu
    ;;
  help|--help|-h)
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  install-cli   Install 'glosim' global command into /usr/local/bin"
    echo "  deploy        Launch containers with docker compose up -d --build"
    echo "  uninstall     Tear down containers (database and uploads untouched)"
    echo "  clean-logs    Truncate container logs and local *.log files"
    echo "  update        Update to the latest release or pull from Git"
    echo "  status        Check container health, ports, and access URLs"
    echo "  secrets       Verify and generate random Strapi security keys in .env"
    echo "  menu          Open the interactive menu (default when no arg provided)"
    ;;
  *)
    error "Unknown option '$1'. Use '$0 --help' for usage."
    exit 1
    ;;
esac
