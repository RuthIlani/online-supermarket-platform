# ?? Docker Hub Deployment Guide

This guide explains how to build and deploy your Catalog Service to Docker Hub, making it available for anyone to run with a single command.

## ?? Quick Start for Users

Once your image is on Docker Hub, anyone can run it with:

```bash
# Simple run (using environment variables)
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" \
  ilani/online-supermarket-platform:latest

# Open browser: http://localhost:8080/swagger
```

## ?? Deploying to Docker Hub

### Method 1: Automated GitHub Actions (Recommended)

#### **Setup (One-time)**

1. **Create Docker Hub Account**:
   - Go to [hub.docker.com](https://hub.docker.com)
   - Create account and repository named `online-supermarket-platform`

2. **Create Docker Hub Access Token**:
   - Go to Docker Hub ? Account Settings ? Security
   - Create new Access Token
   - Copy the token (you won't see it again)

3. **Add GitHub Secrets**:
   - Go to your GitHub repository ? Settings ? Secrets and variables ? Actions
   - Add these secrets:
     - `DOCKERHUB_USERNAME`: ilani
     - `DOCKERHUB_TOKEN`: Your access token

4. **Update Workflow**:
   - Edit `.github/workflows/docker-hub.yml`
   - Replace `yourusername` with your actual Docker Hub username

#### **Automatic Deployment**

Now every time you push to `main` branch:
- ? Image builds automatically
- ? Pushes to Docker Hub
- ? Tags with `latest` and version numbers
- ? Supports multiple architectures (AMD64, ARM64)

### Method 2: Manual Deployment

#### **Linux/macOS**

1. **Make script executable**:
```bash
chmod +x scripts/deploy-to-dockerhub.sh
```

2. **Login to Docker Hub**:
```bash
docker login
```

3. **Run deployment script**:
```bash
./scripts/deploy-to-dockerhub.sh
```

#### **Windows**

1. **Login to Docker Hub**:
```cmd
docker login
```

2. **Run deployment script**:
```cmd
scripts\deploy-to-dockerhub.bat
```

### Method 3: Manual Commands

```bash
# 1. Login to Docker Hub
docker login

# 2. Build the image
docker build -t ilani/online-supermarket-platform:latest .

# 3. Push to Docker Hub
docker push ilani/online-supermarket-platform:latest
```

## ?? Docker Hub Repository Setup

### **Repository Information**

- **Name**: `online-supermarket-platform`
- **Description**: `.NET 8 ASP.NET Core Web API for supermarket catalog management`
- **Visibility**: Public (so anyone can pull)

### **Recommended Tags**

- `latest` - Latest stable version
- `v1.0.0` - Specific version numbers
- `main` - Latest from main branch

## ?? User Documentation

### **README for Docker Hub**

Add this to your Docker Hub repository description:

```markdown
# Online Supermarket Platform - Catalog Service

A production-ready .NET 8 ASP.NET Core Web API for supermarket catalog management.

## Quick Start

```bash
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="Your-Connection-String" \
  ilani/online-supermarket-platform:latest
```

## Features
- RESTful API for products and categories
- Health checks and monitoring
- Swagger documentation
- Global exception handling
- Production-ready with security best practices

## Endpoints
- `http://localhost:8080/swagger` - API Documentation
- `http://localhost:8080/health` - Health Check
- `http://localhost:8080/api/products` - Products API
- `http://localhost:8080/api/categories` - Categories API

## Environment Variables
- `SQL_CONNECTION_STRING` - Database connection string (required)
- `ASPNETCORE_ENVIRONMENT` - Environment (default: Production)

## Source Code
GitHub: https://github.com/ilani/online-supermarket-platform
```

## ?? Version Management

### **Semantic Versioning**

Use Git tags for versions:

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will automatically build and push:
# - ilani/online-supermarket-platform:v1.0.0
# - ilani/online-supermarket-platform:1.0
# - ilani/online-supermarket-platform:1
# - ilani/online-supermarket-platform:latest
```

### **Rolling Updates**

For production deployments:

```bash
# Pull latest version
docker pull ilani/online-supermarket-platform:latest

# Stop and remove old container
docker stop catalog-service
docker rm catalog-service

# Start new container
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="..." \
  ilani/online-supermarket-platform:latest
```

This setup makes your Catalog Service easily deployable by anyone with just a Docker command! ??