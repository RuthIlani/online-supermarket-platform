# Quick Deployment with Docker Hub Images

This guide shows how to deploy the Online Supermarket Platform using pre-built images from Docker Hub.

## 🚀 Quick Start (1 minute deployment)

### Prerequisites:
- Docker and Docker Compose installed
- Internet connection

### Steps:

1. **Download the deployment files:**
   ```bash
   # Create a new directory
   mkdir online-supermarket-deployment
   cd online-supermarket-deployment
   
   # Download docker-compose file
   curl -o docker-compose.yml https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/docker-compose.hub.yml
   
   # Download environment template
   curl -o .env.example https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/.env.example
   ```

2. **Configure your environment:**
   ```bash
   # Copy and edit environment file
   cp .env.example .env
   
   # Edit .env with your GCP database credentials
   notepad .env  # On Windows
   nano .env     # On Linux/Mac
   ```

3. **Start the services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application:**
   - 🛒 **Shopping App**: http://localhost:3000
   - 🔧 **API Health**: http://localhost:7083/health
   - 📦 **API Products**: http://localhost:7083/api/products

## 📦 Docker Hub Images

- **Catalog Service**: `ilani/online-supermarket-catalog-service:latest`
- **Shopping App**: `ilani/online-supermarket-shopping-app:latest`

## 🌐 Environment Variables Required

```bash
# GCP Cloud SQL Configuration
SQL_CONNECTION_STRING=Server=YOUR_GCP_IP,1433;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASS;Encrypt=true;TrustServerCertificate=true;

# Application Settings
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:8080
```

## 🛠️ Production Deployment Options

### Option 1: Single Command (with environment variables)
```bash
docker run -d \
  --name catalog-service \
  -p 7083:8080 \
  -e SQL_CONNECTION_STRING="Server=YOUR_IP,1433;Database=YOUR_DB;..." \
  -e ASPNETCORE_ENVIRONMENT=Production \
  ilani/online-supermarket-catalog-service:latest

docker run -d \
  --name shopping-app \
  -p 3000:80 \
  ilani/online-supermarket-shopping-app:latest
```

### Option 2: Cloud Platforms

#### **Azure Container Instances**
```bash
az container create \
  --resource-group myResourceGroup \
  --name online-supermarket \
  --image ilani/online-supermarket-catalog-service:latest \
  --ports 8080 \
  --environment-variables SQL_CONNECTION_STRING="Server=..."
```

#### **Google Cloud Run**
```bash
gcloud run deploy online-supermarket \
  --image ilani/online-supermarket-catalog-service:latest \
  --port 8080 \
  --set-env-vars="SQL_CONNECTION_STRING=Server=..."
```

#### **AWS ECS**
```json
{
  "family": "online-supermarket",
  "containerDefinitions": [
    {
      "name": "catalog-service",
      "image": "ilani/online-supermarket-catalog-service:latest",
      "portMappings": [{"containerPort": 8080}],
      "environment": [
        {
          "name": "SQL_CONNECTION_STRING",
          "value": "Server=YOUR_IP,1433;..."
        }
      ]
    }
  ]
}
```

## 🔄 Updates and Maintenance

### Pull Latest Images:
```bash
docker pull ilani/online-supermarket-catalog-service:latest
docker pull ilani/online-supermarket-shopping-app:latest
docker-compose up -d --force-recreate
```

### Health Monitoring:
```bash
# Check service health
curl http://localhost:7083/health
curl http://localhost:7083/health/detailed

# View logs
docker-compose logs -f catalog-service
docker-compose logs -f shopping-app
```

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check your SQL_CONNECTION_STRING in .env
   - Verify GCP SQL instance is running and accessible
   - Check firewall rules in GCP

2. **Port Already in Use**
   ```bash
   # Change ports in docker-compose.yml
   ports:
     - "8083:8080"  # Change 7083 to 8083
     - "4000:80"    # Change 3000 to 4000
   ```

3. **Image Pull Failed**
   ```bash
   # Login to Docker Hub if needed
   docker login
   
   # Pull images manually
   docker pull ilani/online-supermarket-catalog-service:latest
   docker pull ilani/online-supermarket-shopping-app:latest
   ```

## 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shopping App  │    │  Catalog API    │    │   GCP Cloud     │
│   (Port 3000)   │───▶│   (Port 7083)   │───▶│   SQL Server    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Security Notes

- Never commit .env files to Git
- Use strong database passwords
- Configure GCP SQL firewall properly
- Use HTTPS in production
- Regularly update Docker images
