# Catalog Service - .NET 8 Web API

A comprehensive .NET 8 ASP.NET Core Web API for supermarket catalog management with global exception handling, health checks, and Docker support.

## 🚀 Quick Start - One Command Run

```bash
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="[YOUR_SQL_CONNECTION_STRING]" \
  ilani/online-supermarket-platform:latest
```

**Then access:**
- 📚 **API Documentation**: http://localhost:8080/swagger
- ❤️ **Health Check**: http://localhost:8080/health
- 🛒 **Products API**: http://localhost:8080/api/products
- 📂 **Categories API**: http://localhost:8080/api/categories

**Stop the service:**
```bash
docker stop catalog-service && docker rm catalog-service
```

## 🎯 Available on Docker Hub

```bash
# Pull the latest image
docker pull ilani/online-supermarket-platform:latest
```

**Multi-architecture support:** linux/amd64, linux/arm64

## 📋 Core Features

- ✅ **Product Management** - CRUD operations for products
- ✅ **Category Management** - CRUD operations for categories  
- ✅ **Entity Framework Core** - Code-first with migrations
- ✅ **SQL Server** - Google Cloud SQL integration
- ✅ **Swagger/OpenAPI** - Interactive API documentation
- ✅ **Global Exception Handling** - Centralized error management
- ✅ **Health Checks** - Multiple endpoints for monitoring
- ✅ **CORS** - Configured for React frontend
- ✅ **Docker Support** - Multi-stage builds with security

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

## 🔧 Configuration

**Environment Variables:**
- `SQL_CONNECTION_STRING` - Database connection string (required)
- `ASPNETCORE_ENVIRONMENT` - Environment (Development/Production)

**Connection String Format:**
```
Server=HOST,PORT;Database=DATABASE;User Id=USERNAME;Password=PASSWORD;Encrypt=true;TrustServerCertificate=true;
```

## �️ Development Setup

```bash
# 1. Clone repository
git clone https://github.com/RuthIlani/online-supermarket-platform.git
cd online-supermarket-platform/CatalogService

# 2. Set up secrets
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "[YOUR_CONNECTION_STRING]"

# 3. Run the application
dotnet run

# 4. Open: http://localhost:5000/swagger
```

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:8080/health

# Test API endpoints
curl http://localhost:8080/api/products
curl http://localhost:8080/api/categories

```

🎉 Success! Your Catalog Service provides interactive API docs at `/swagger` and health monitoring at `/health`.**
