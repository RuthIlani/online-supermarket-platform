# Catalog Service - .NET 8 Web API

A comprehensive .NET 8 ASP.NET Core Web API for supermarket catalog management with global exception handling, health checks, and Docker support.

## 🚀 **Super Simple - Run from Docker Hub**

### **One Command Run** ⭐
```bash
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="Server=35.224.255.219,1433;Database=SupermarketCatalog;User Id=sqlserver;Password=superSqlServer;Encrypt=true;TrustServerCertificate=true;" \
  ilani/online-supermarket-platform:latest

# Open: http://localhost:8080/swagger
```

### **Even Simpler - Use Run Scripts** 🎯

#### **Linux/macOS:**
```bash
curl -o run.sh https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/run.sh
chmod +x run.sh
./run.sh
```

#### **Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/run.ps1" -OutFile "run.ps1"
.\run.ps1
```

#### **Docker Compose:**
```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/docker-compose.public.yml
docker-compose up -d
```

## 🎯 **Available on Docker Hub**

```bash
# Pull the image
docker pull ilani/online-supermarket-platform:latest

# Multiple architecture support
# - linux/amd64 (Intel/AMD)
# - linux/arm64 (Apple Silicon, ARM servers)
```

## 📋 **Features**

### **Core Functionality**
- ✅ **Product Management** - CRUD operations for products
- ✅ **Category Management** - CRUD operations for categories  
- ✅ **Entity Framework Core** - Code-first with migrations
- ✅ **SQL Server** - Google Cloud SQL integration
- ✅ **Swagger/OpenAPI** - Interactive API documentation

### **Production-Ready Features**
- ✅ **Global Exception Handling** - Centralized error management
- ✅ **Health Checks** - Multiple endpoints for monitoring
- ✅ **Logging** - Structured logging with different levels
- ✅ **CORS** - Configured for React frontend
- ✅ **AutoMapper** - Object-to-object mapping
- ✅ **Docker Support** - Multi-stage builds with security

### **Security & Configuration**
- ✅ **User Secrets** - Secure local development
- ✅ **Environment Variables** - Production configuration
- ✅ **Multiple Environments** - Development, Production support
- ✅ **Connection String Fallbacks** - Multiple configuration sources

## 🌐 **API Endpoints**

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID

### **Categories**  
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `GET /api/categories/{id}/products` - Get products by category

### **Health Checks**
- `GET /health` - Basic health status
- `GET /health/ready` - Kubernetes readiness probe
- `GET /health/live` - Kubernetes liveness probe  
- `GET /health/detailed` - Comprehensive health information

### **Documentation**
- `GET /swagger` - Interactive API documentation (Development only)

## 🔧 **Configuration Options**

### **Environment Variables**
- `SQL_CONNECTION_STRING` - Database connection string (required)
- `ASPNETCORE_ENVIRONMENT` - Environment (Development/Production)
- `ASPNETCORE_URLS` - Application URLs (default: http://+:8080)

### **Connection String Format**
```
Server=HOST,PORT;Database=DATABASE;User Id=USERNAME;Password=PASSWORD;Encrypt=true;TrustServerCertificate=true;
```

## 🚀 **Deployment Options**

### **1. Docker Hub (Simplest)**
```bash
# Run with environment variables
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="Your-Connection-String" \
  ilani/online-supermarket-platform:latest
```

### **2. Docker Compose**
```yaml
version: '3.8'
services:
  catalog-service:
    image: ilani/online-supermarket-platform:latest
    ports:
      - "8080:8080"
    environment:
      - SQL_CONNECTION_STRING=Your-Connection-String
```

### **3. Cloud Deployments**

#### **Azure Container Instances**
```bash
az container create \
  --resource-group myResourceGroup \
  --name catalog-service \
  --image ilani/online-supermarket-platform:latest \
  --ports 8080 \
  --environment-variables SQL_CONNECTION_STRING="Your-Connection-String"
```

#### **Google Cloud Run**
```bash
gcloud run deploy catalog-service \
  --image ilani/online-supermarket-platform:latest \
  --port 8080 \
  --set-env-vars SQL_CONNECTION_STRING="Your-Connection-String"
```

#### **AWS ECS**
```json
{
  "family": "catalog-service",
  "containerDefinitions": [
    {
      "name": "catalog-service",
      "image": "ilani/online-supermarket-platform:latest",
      "portMappings": [{"containerPort": 8080}],
      "environment": [
        {
          "name": "SQL_CONNECTION_STRING",
          "value": "Your-Connection-String"
        }
      ]
    }
  ]
}
```

## 📊 **Health Monitoring**

### **Health Check Types**
- **Database Connectivity** - EF Core DbContext validation
- **SQL Server Connection** - Direct SQL Server health check
- **Catalog Service** - Application functionality validation
- **Memory Usage** - System memory monitoring

### **Monitoring Endpoints**
```bash
# Basic health (for load balancers)
curl http://localhost:8080/health

# Kubernetes readiness
curl http://localhost:8080/health/ready

# Kubernetes liveness  
curl http://localhost:8080/health/live

# Detailed monitoring
curl http://localhost:8080/health/detailed
```

## 🛠️ **Development Setup**

### **For Contributors**

#### **Option 1: Using User Secrets (Recommended for Development)**
```bash
# 1. Clone and navigate
git clone https://github.com/ilani/online-supermarket-platform.git
cd online-supermarket-platform/CatalogService

# 2. Set up secrets (one-time)
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Your-Connection-String"

# 3. Run the application
dotnet run

# 4. Open swagger: http://localhost:5000/swagger
```

#### **Option 2: Using Docker Development**
```bash
# 1. Clone and navigate
git clone https://github.com/ilani/online-supermarket-platform.git
cd online-supermarket-platform/CatalogService

# 2. Copy environment file
cp .env.example .env

# 3. Run with Docker
docker-compose up -d

# 4. Open swagger: http://localhost:8080/swagger
```

## 🧪 **Testing**

### **Health Check**
```bash
# Test basic connectivity
curl http://localhost:8080/health

# Expected response
{"status":"Healthy","timestamp":"2025-01-22T...","duration":"00:00:00.123"}
```

### **API Endpoints**
```bash
# Get all products
curl http://localhost:8080/api/products

# Get all categories
curl http://localhost:8080/api/categories

# Get products by category
curl http://localhost:8080/api/categories/1/products
```

## 📚 **Documentation**

- **[Secret Management Guide](docs/secret-management.md)** - Complete guide for managing secrets
- **[Docker Hub Deployment](docs/docker-hub-deployment.md)** - Deploy to Docker Hub
- **[Docker Deployment Guide](docs/docker-deployment.md)** - Docker deployment instructions
- **[Health Checks Documentation](docs/HealthChecks.md)** - Health check system details

## 🐳 **Docker Hub Repository**

- **Repository**: `ilani/online-supermarket-platform`
- **Tags**: `latest`, version numbers (v1.0.0, v1.1.0, etc.)
- **Architectures**: linux/amd64, linux/arm64
- **Auto-built**: Updates automatically on Git push

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

---

## 🆘 **Quick Troubleshooting**

### **Container not starting**
```bash
# Check container logs
docker logs catalog-service

# Common issues:
# - Wrong connection string format
# - Database not accessible
# - Port already in use
```

### **Database connection errors**
```bash
# Test health endpoint
curl http://localhost:8080/health/detailed

# Check environment variables
docker exec catalog-service env | grep SQL
```

### **Port conflicts**
```bash
# Use different port
docker run -p 9080:8080 ilani/online-supermarket-platform:latest
# Then access: http://localhost:9080/swagger
```

---

## 🎉 **Success!**

Once running, your Catalog Service provides:
- 📚 **Interactive API docs** at `/swagger`
- ❤️ **Health monitoring** at `/health`
- 🛒 **Product catalog API** at `/api/products`
- 📂 **Category management** at `/api/categories`

**Happy coding! 🚀**
