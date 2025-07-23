# Online Supermarket Shopping App - Docker Deployment Guide

## Overview
This React shopping application integrates with a catalog server and can be deployed as a Docker container for easy deployment and scaling.

## Docker Files Created

### 1. `Dockerfile`
Multi-stage Docker build:
- **Stage 1**: Node.js build environment
- **Stage 2**: Nginx production server
- Optimized for production with minimal image size

### 2. `docker-compose.yml`
Container orchestration configuration:
- Service definition
- Port mapping (3000:80)
- Network configuration
- Environment variables

### 3. `nginx.conf`
Custom Nginx configuration:
- SPA routing support (React Router)
- Gzip compression
- Static asset caching
- Security headers

### 4. `.dockerignore`
Excludes unnecessary files from Docker build context

## Prerequisites
- **Docker Desktop** installed and running
- **Docker Compose** (included with Docker Desktop)
- Your **catalog server** running on `https://localhost:7083`

## Quick Start

### Option 1: Using Docker Compose (Recommended)
```bash
# Navigate to the project directory
cd "c:\Users\User\myApps\online-supermarket-platform\shopping-app"

# Build and start the container
docker-compose up --build

# Or run in detached mode (background)
docker-compose up --build -d
```

### Option 2: Using Docker Commands
```bash
# Navigate to the project directory
cd "c:\Users\User\myApps\online-supermarket-platform\shopping-app"

# Build the Docker image
docker build -t online-supermarket-shopping-app .

# Run the container
docker run -d -p 3000:80 --name shopping-app online-supermarket-shopping-app
```

## Accessing the Application
- **URL**: http://localhost:3000
- **Internal Port**: 80 (Nginx)
- **External Port**: 3000 (mapped to your host)

## Docker Commands Cheat Sheet

### Building and Running
```bash
# Build image
docker build -t online-supermarket-shopping-app .

# Run container
docker run -d -p 3000:80 --name shopping-app online-supermarket-shopping-app

# Run with environment variables
docker run -d -p 3000:80 -e NODE_ENV=production --name shopping-app online-supermarket-shopping-app
```

### Container Management
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop shopping-app

# Start stopped container
docker start shopping-app

# Remove container
docker rm shopping-app

# Remove image
docker rmi online-supermarket-shopping-app
```

### Monitoring and Debugging
```bash
# View container logs
docker logs shopping-app

# Follow logs in real-time
docker logs -f shopping-app

# Execute commands inside container
docker exec -it shopping-app sh

# Check container resource usage
docker stats shopping-app

# Inspect container details
docker inspect shopping-app
```

### Docker Compose Commands
```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

## Container Features

### ✅ Production Optimized
- **Multi-stage build** - Smaller final image
- **Nginx web server** - High performance
- **Gzip compression** - Faster loading
- **Static asset caching** - Better performance

### ✅ React App Support
- **SPA routing** - React Router compatibility
- **Environment variables** - Configuration support
- **Build optimization** - Minified and compressed

### ✅ Security & Performance
- **Security headers** - XSS protection, CSP, etc.
- **Asset caching** - 1-year cache for static files
- **Compression** - Gzip for text files

## Environment Configuration

### Development
```bash
# Run with development settings
docker run -d -p 3000:80 -e NODE_ENV=development --name shopping-app online-supermarket-shopping-app
```

### Production
```bash
# Run with production settings (default)
docker run -d -p 3000:80 -e NODE_ENV=production --name shopping-app online-supermarket-shopping-app
```

## Networking with Catalog Server

### If catalog server is also containerized:
```yaml
# docker-compose.yml
version: '3.8'
services:
  catalog-server:
    # Your catalog server configuration
    ports:
      - "7083:7083"
    networks:
      - supermarket-network
      
  shopping-app:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - catalog-server
    networks:
      - supermarket-network
```

### If catalog server runs on host:
```bash
# Use host.docker.internal to access host services
docker run -d -p 3000:80 --add-host=host.docker.internal:host-gateway --name shopping-app online-supermarket-shopping-app
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Use different port
docker run -d -p 8080:80 --name shopping-app online-supermarket-shopping-app
```

#### 2. Build Fails
```bash
# Clean build without cache
docker build --no-cache -t online-supermarket-shopping-app .

# Check build logs
docker build -t online-supermarket-shopping-app . --progress=plain
```

#### 3. Container Won't Start
```bash
# Check container logs
docker logs shopping-app

# Run interactively for debugging
docker run -it --rm online-supermarket-shopping-app sh
```

#### 4. Can't Connect to Catalog Server
- Ensure catalog server is running on `https://localhost:7083`
- Check firewall settings
- Verify CORS configuration on catalog server
- Use `host.docker.internal` if server is on host machine

### Performance Optimization
```bash
# Prune unused images and containers
docker system prune

# Remove unused volumes
docker volume prune

# Monitor resource usage
docker stats
```

## Production Deployment Considerations

### 1. Environment Variables
```bash
# Use environment file
docker run --env-file .env.production -d -p 3000:80 online-supermarket-shopping-app
```

### 2. SSL/HTTPS
- Use reverse proxy (nginx, traefik)
- Configure SSL certificates
- Update API URLs to HTTPS

### 3. Scaling
```yaml
# docker-compose.yml
services:
  shopping-app:
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
```

### 4. Health Checks
```dockerfile
# Add to Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

## Next Steps
1. **Start your catalog server** on `https://localhost:7083`
2. **Build and run the Docker container**:
   ```bash
   docker-compose up --build
   ```
3. **Access the application** at http://localhost:3000
4. **Verify catalog integration** works correctly
5. **Deploy to production** environment when ready

The containerized application is now ready for development, testing, and production deployment!
