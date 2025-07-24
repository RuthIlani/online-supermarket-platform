# Catalog Service - .NET 8 Web API

A comprehensive .NET 8 ASP.NET Core Web API for supermarket catalog management with global exception handling, health checks, and Docker support.

## 🚀 Quick Start - One Command Run

```bash
docker run -d \
  --name catalog-service \
  -p 7023:7023 \
  -e SQL_CONNECTION_STRING="[YOUR_SQL_CONNECTION_STRING]" \
  ilani/online-supermarket-platform:latest
```

**Then access:**
- 📚 **API Documentation**: http://localhost:7023/swagger *(Development mode only)*
- ❤️ **Health Check**: http://localhost:7023/health
- 🛒 **Products API**: http://localhost:7023/api/products
- 📂 **Categories API**: http://localhost:7023/api/categories

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

## 🛠️ Development Setup

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
curl http://localhost:7023/health

# Test API endpoints
curl http://localhost:7023/api/products
curl http://localhost:7023/api/categories
```

## 📚 Documentation

- **[Secret Management Guide](docs/secret-management.md)** - Complete guide for managing secrets
- **[Docker Hub Deployment](docs/docker-hub-deployment.md)** - Deploy to Docker Hub
- **[Docker Deployment Guide](docs/docker-deployment.md)** - Docker deployment instructions
- **[Health Checks Documentation](docs/HealthChecks.md)** - Health check system details

## 🐳 Docker Hub Repository

- **Repository**: `ilani/online-supermarket-platform`
- **Tags**: `latest`, version numbers (v1.0.0, v1.1.0, etc.)
- **Architectures**: linux/amd64, linux/arm64
- **Auto-built**: Updates automatically on Git push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Quick Troubleshooting

### Container not starting
```bash
# Check container logs
docker logs catalog-service

# Common issues:
# - Wrong connection string format
# - Database not accessible
# - Port already in use
```

### Database connection errors
```bash
# Test health endpoint
curl http://localhost:7023/health/detailed

# Check environment variables
docker exec catalog-service env | grep SQL
```

### Port conflicts
```bash
# Use different port
docker run -p 9080:7023 ilani/online-supermarket-platform:latest
# Then access: http://localhost:9080/swagger
```

---

## 🎉 Success!

Once running, your Catalog Service provides:
- 📚 **Interactive API docs** at `/swagger`
- ❤️ **Health monitoring** at `/health`
- 🛒 **Product catalog API** at `/api/products`
- 📂 **Category management** at `/api/categories`

**Happy coding! 🚀**
