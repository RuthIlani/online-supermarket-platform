# Docker Deployment Guide - Online Supermarket Platform

This guide explains how to run the complete Online Supermarket Platform using Docker containers.

## Platform Architecture

The platform consists of:
- **Shopping App**: React frontend application (port 3000)
- **Catalog Service**: .NET 8.0 Web API backend (port 7083)
- **SQL Server**: Database for catalog data (port 1433)

## Prerequisites

1. **Docker Desktop** installed and running
2. **Docker Compose** (included with Docker Desktop)
3. At least 4GB of available RAM
4. Ports 3000, 7083, and 1433 available

## Quick Start

### 1. Navigate to Infrastructure Directory

```powershell
cd c:\Users\User\myApps\online-supermarket-platform\shopping-app\infrastructure
```

### 2. Build and Start All Services

```powershell
docker-compose up --build
```

This command will:
- Pull the SQL Server image
- Build the Catalog Service from source
- Build the Shopping App from source
- Create a shared network for all services
- Start all containers with proper dependencies

### 3. Wait for Services to Start

The services will start in this order:
1. **SQL Server** (takes ~30-60 seconds)
2. **Catalog Service** (waits for database, takes ~1-2 minutes)
3. **Shopping App** (waits for API, takes ~30 seconds)

### 4. Access the Application

- **Shopping App**: http://localhost:3000
- **Catalog API**: http://localhost:7083/swagger (API documentation)
- **SQL Server**: localhost:1433 (sa/YourStrong@Passw0rd)

## Service Details

### SQL Server Database
- **Image**: mcr.microsoft.com/mssql/server:2022-latest
- **Database**: CatalogDb
- **Username**: sa
- **Password**: YourStrong@Passw0rd
- **Volume**: Persistent storage for database data

### Catalog Service (.NET 8.0 API)
- **Build Context**: ../CatalogService
- **Environment**: Production
- **Features**: Entity Framework Core, AutoMapper, Swagger
- **Health Check**: Available at `/health` endpoint

### Shopping App (React)
- **Build Context**: ../shopping-app
- **Server**: Nginx (production optimized)
- **Features**: Multi-language support, Redux state management

## Management Commands

### View Running Containers
```powershell
docker-compose ps
```

### View Logs
```powershell
# All services
docker-compose logs

# Specific service
docker-compose logs shopping-app
docker-compose logs catalog-service
docker-compose logs sqlserver
```

### Stop Services
```powershell
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v
```

### Rebuild Services
```powershell
# Rebuild all services
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache shopping-app
```

### Scale Services (if needed)
```powershell
# Run multiple instances of catalog service
docker-compose up --scale catalog-service=2
```

## Development Mode

For development with live reload:

```powershell
# Start only database and API
docker-compose up sqlserver catalog-service

# In separate terminal, run React app locally
cd ../shopping-app
npm start
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```
   Error: Port 3000 is already allocated
   ```
   Solution: Stop other services using these ports or modify port mappings in docker-compose.yml

2. **SQL Server Connection Failed**
   ```
   Error: Cannot connect to SQL Server
   ```
   Solution: Wait longer for SQL Server to fully initialize (can take 60+ seconds)

3. **API Not Responding**
   ```
   Error: 502 Bad Gateway
   ```
   Solution: Check if Catalog Service is healthy:
   ```powershell
   docker-compose logs catalog-service
   ```

4. **Build Errors**
   ```
   Error: Docker build failed
   ```
   Solution: Clean Docker cache and rebuild:
   ```powershell
   docker system prune -f
   docker-compose build --no-cache
   ```

### Health Checks

Check service health:
```powershell
# Catalog Service health
curl http://localhost:7083/health

# Shopping App
curl http://localhost:3000

# SQL Server (requires SQL client)
docker exec -it catalog-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -Q "SELECT 1"
```

### Database Management

Connect to SQL Server:
```powershell
# Using Docker exec
docker exec -it catalog-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd"

# Server: localhost,1433
# Username: sa
# Password: YourStrong@Passw0rd
```

## Production Considerations

1. **Environment Variables**: Replace default passwords with secure values
2. **SSL/TLS**: Configure HTTPS for production deployment
3. **Monitoring**: Add health check endpoints and monitoring solutions
4. **Backup**: Implement database backup strategies
5. **Scaling**: Use orchestration platforms like Kubernetes for production scale

## Network Configuration

All services run in the `supermarket-network` bridge network:
- Services can communicate using container names as hostnames
- Shopping App connects to `http://catalog-service:8080/api`
- Catalog Service connects to `sqlserver:1433`

## File Structure

```
infrastructure/
├── docker-compose.yml          # Main orchestration file
└── DOCKER_DEPLOYMENT.md        # This guide

shopping-app/
├── Dockerfile                  # React app build instructions
├── .dockerignore              # React build exclusions
└── nginx.conf                 # Production web server config
```

## Support

For issues or questions:
1. Check service logs: `docker-compose logs [service-name]`
2. Verify service health: `docker-compose ps`
3. Review this documentation
4. Check Docker Desktop dashboard for container status
