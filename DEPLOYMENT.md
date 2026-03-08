# Deployment Guide - Code Updates

This guide explains how to deploy new code changes to your running NBV Resource Booking System.

## Quick Command Reference

| Command | Purpose | When to Use |
|---------|---------|------------|
| `docker compose up -d --build` | Full rebuild and restart | After code changes |
| `docker compose restart` | Restart without rebuild | Configuration changes only |
| `docker compose down && docker compose up -d --build` | Clean restart | When experiencing issues |
| `docker compose pull` | Update base images | Security updates |

## Main Deployment Command

### `docker compose up -d --build`

This is your primary command for deploying new code. Here's what each part does:

#### Command Breakdown

- **`docker compose`**: The Docker Compose CLI tool that manages your multi-container application
- **`up`**: Starts and runs all services defined in docker-compose.yml
- **`-d` (detached)**: Runs containers in background, returns control to terminal
- **`--build`**: Forces rebuild of images before starting containers

#### What Happens During Execution

1. **Build Phase**
   - Reads all Dockerfiles
   - Rebuilds frontend image (React app compilation)
   - Rebuilds backend image (Node.js dependencies)
   - Uses cache when possible for faster builds

2. **Network Setup**
   - Creates or verifies `nbv-network` for container communication

3. **Container Startup**
   - Stops old containers (if running)
   - Starts new containers with updated code
   - Maintains volume mounts for data persistence

4. **Health Checks**
   - Verifies each service is responding correctly
   - NPM: Port 81 admin panel
   - Frontend: Port 3000 web server
   - Backend: Port 3005 API endpoints

## Deployment Workflows

### 1. Standard Code Deployment

After pushing new code to your server:

```bash
# Navigate to project directory
cd /opt/nbv-booking

# Pull latest changes
git pull origin main

# Rebuild and restart all services
docker compose up -d --build

# Verify services are running
docker compose ps

# Check logs for any errors
docker compose logs -f
```

### 2. Zero-Downtime Deployment

For minimal service interruption:

```bash
# Build new images without stopping services
docker compose build

# Restart services one by one
docker compose up -d --no-deps backend
docker compose up -d --no-deps frontend
docker compose restart nginx-proxy-manager
```

### 3. Frontend-Only Updates

When only React code changed:

```bash
# Rebuild only frontend
docker compose build frontend

# Restart frontend container
docker compose up -d --no-deps frontend
```

### 4. Backend-Only Updates

When only API code changed:

```bash
# Rebuild only backend
docker compose build backend

# Restart backend container
docker compose up -d --no-deps backend
```

### 5. Emergency Restart

If services are unresponsive:

```bash
# Force stop all containers
docker compose down

# Remove any stuck containers
docker container prune -f

# Full rebuild and start
docker compose up -d --build
```

### 6. Rolling Back Changes

If new deployment causes issues:

```bash
# Revert to previous git commit
git log --oneline -5  # Find previous commit
git checkout <commit-hash>

# Rebuild with previous code
docker compose down
docker compose up -d --build
```

## Pre-Deployment Checklist

Before running deployment commands:

- [ ] **Test locally** if possible
- [ ] **Backup database**: `cp data/db/db.json data/db/db.json.backup`
- [ ] **Check disk space**: `df -h`
- [ ] **Note current version**: `git log --oneline -1`
- [ ] **Inform users** if expecting downtime

## Post-Deployment Verification

After deployment, always verify:

1. **Check container status**
   ```bash
   docker compose ps
   ```
   All services should show "running" or "healthy"

2. **Review logs for errors**
   ```bash
   docker compose logs --tail=50
   ```

3. **Test application**
   - Frontend loads: `http://your-server`
   - API responds: `http://your-server/api/users`
   - NPM admin works: `http://your-server:81`

4. **Monitor resources**
   ```bash
   docker stats --no-stream
   ```

## Common Issues and Solutions

### Build Failures

**Problem**: `npm install` fails
```bash
# Clear Docker build cache
docker system prune -f
docker compose build --no-cache
```

**Problem**: "No space left on device"
```bash
# Clean up Docker resources
docker system prune -a -f
docker volume prune -f
```

### Container Won't Start

**Problem**: Port already in use
```bash
# Find process using port
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

**Problem**: Container exits immediately
```bash
# Check detailed logs
docker compose logs backend
# Rebuild without cache
docker compose build --no-cache backend
```

### Network Issues

**Problem**: Containers can't communicate
```bash
# Recreate network
docker network rm nbv-network
docker compose up -d
```

## When to Use Which Command

### Use `--build` flag when:
- Source code changed
- Dockerfile modified
- package.json dependencies updated
- First deployment
- After git pull

### Skip `--build` flag when:
- Only restarting services
- No code changes
- Testing connectivity
- Quick service bounce

### Use `down` first when:
- Changing docker-compose.yml
- Network issues
- Persistent problems
- Clean slate needed

## Environment-Specific Notes

### Development
```bash
# Verbose output for debugging
docker compose up --build

# Follow logs
docker compose logs -f
```

### Production
```bash
# Always use detached mode
docker compose up -d --build

# Monitor after deployment
docker compose logs --tail=100 -f
```

## Quick Troubleshooting

| Symptom | Quick Fix |
|---------|-----------|
| Frontend not loading | `docker compose restart frontend` |
| API errors | `docker compose restart backend` |
| NPM not routing | `docker compose restart nginx-proxy-manager` |
| Everything broken | `docker compose down && docker compose up -d --build` |

## Related Documentation

- Initial setup: See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)
- Architecture details: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- Development guide: See [CLAUDE.md](./CLAUDE.md)