# Docker Setup Quick Start

## Prerequisites
1. **Install Docker Desktop** if not already installed:
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and restart your computer if needed

2. **Start Docker Desktop**:
   - Look for Docker Desktop in your Start menu
   - Launch it and wait for it to start completely
   - You should see "Docker Desktop is running" in the system tray

## Quick Commands

### 1. Build and Run (Recommended)
```bash
# Make sure you're in the project directory
cd "c:\Users\User\myApps\online-supermarket-platform\shopping-app"

# Start Docker Desktop first, then run:
docker-compose up --build
```

### 2. Access Your App
- Open browser and go to: http://localhost:3000
- Your React app will be running in a Docker container!

### 3. Stop the Container
```bash
# Press Ctrl+C if running in foreground, or:
docker-compose down
```

## Troubleshooting

### "Docker not found" or "pipe" errors:
1. **Start Docker Desktop** - Look in Start menu
2. **Wait for it to fully start** - Check system tray for "Docker Desktop is running"
3. **Try the command again**

### Port 3000 already in use:
```bash
# Use a different port
docker-compose up --build -p 8080:80
# Then access at http://localhost:8080
```

### Build fails:
```bash
# Clean build
docker-compose build --no-cache
```

## What the Container Includes
- ✅ Your React shopping app
- ✅ Nginx web server
- ✅ All dependencies included
- ✅ Production-optimized build
- ✅ Automatic restarts
- ✅ Gzip compression
- ✅ Security headers

## Need Help?
1. Make sure Docker Desktop is running (green icon in system tray)
2. Make sure you're in the correct directory
3. Check the full tutorial in `CATALOG_API_INTEGRATION.md`
