# Docker Deployment Guide

This guide explains how to securely deploy your Catalog Service using Docker without exposing sensitive credentials in your repository.

## ?? Security Methods for Credentials

### Method 1: Environment Variables with .env File (Recommended for Development)

1. **Create `.env` file** (not committed to Git):
```bash
# Copy the example and fill in your real values
cp .env.example .env
```

2. **Edit `.env` file** with your actual credentials:
```env
SQL_CONNECTION_STRING=YOUR_SQL_CONNECTION_STRING_HERE
```

3. **Run with Docker Compose**:
```bash
docker-compose up -d
```

### Method 2: Docker Secrets (Recommended for Production)

1. **Create Docker secrets**:
```bash
# Create the connection string as a Docker secret
echo "YOUR_SQL_CONNECTION_STRING_HERE" | docker secret create sql_connection_string -
```

2. **Use Docker Compose with secrets**:
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  catalogservice:
    build: .
    secrets:
      - sql_connection_string
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    command: sh -c "export SQL_CONNECTION_STRING=$(cat /run/secrets/sql_connection_string) && dotnet CatalogService.dll"

secrets:
  sql_connection_string:
    external: true
```

### Method 3: Runtime Environment Variables

**For Docker run command**:
```bash
docker build -t catalog-service .

docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" \
  catalog-service
```

### Method 4: Cloud Provider Secrets (Best for Production)

#### Google Cloud Secret Manager
```bash
# Store secret in Google Secret Manager
gcloud secrets create sql-connection-string --data-file=connection_string.txt

# Use in Cloud Run
gcloud run deploy catalog-service \
  --image gcr.io/your-project/catalog-service \
  --set-env-vars SQL_CONNECTION_STRING=$(gcloud secrets versions access latest --secret="sql-connection-string")
```

#### Azure Key Vault
```bash
# Store in Azure Key Vault
az keyvault secret set --vault-name YourKeyVault --name sql-connection-string --value "Your-Connection-String"
```

#### AWS Secrets Manager
```bash
# Store in AWS Secrets Manager
aws secretsmanager create-secret --name sql-connection-string --secret-string "Your-Connection-String"
```

## ?? Deployment Commands

### Development (Local Docker)
```bash
# 1. Create .env file with your credentials
cp .env.example .env
nano .env  # Edit with your credentials

# 2. Build and run
docker-compose up -d

# 3. Check health
curl http://localhost:8080/health
```

### Production (Using environment variables)
```bash
# 1. Build the image
docker build -t catalog-service .

# 2. Run with environment variables
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" \
  --restart unless-stopped \
  catalog-service
```

### CI/CD Pipeline (GitHub Actions Example)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t catalog-service .
      
      - name: Deploy to production
        run: |
          docker run -d \
            --name catalog-service \
            -p 8080:8080 \
            -e ASPNETCORE_ENVIRONMENT=Production \
            -e SQL_CONNECTION_STRING="${{ secrets.SQL_CONNECTION_STRING }}" \
            catalog-service
```

## ?? Health Check Endpoints

After deployment, verify your service is running:

```bash
# Basic health check
curl http://your-server:8080/health

# Detailed health check
curl http://your-server:8080/health/detailed

# Readiness check
curl http://your-server:8080/health/ready
```

## ?? File Structure

```
?? CatalogService/
??? ?? Dockerfile                    # Main Docker configuration
??? ?? docker-compose.yml           # Development orchestration
??? ?? .dockerignore                # Files to exclude from build
??? ?? .env.example                 # Template for environment variables
??? ?? .env                         # Your actual credentials (NOT in Git)
??? ?? docs/
    ??? ?? docker-deployment.md     # This guide
```

## ?? Security Best Practices

### ? DO:
- Use `.env` files for local development
- Use cloud provider secrets for production
- Use Docker secrets for Docker Swarm
- Store secrets in CI/CD pipeline secret stores
- Use least-privilege database users
- Enable SSL/TLS for database connections
- Use health checks for monitoring

### ? DON'T:
- Commit `.env` files to Git
- Put credentials directly in Dockerfile
- Use production credentials in development
- Store secrets in container images
- Use default/weak passwords
- Disable SSL/TLS in production

## ?? Troubleshooting

### Connection Issues
```bash
# Check if container is running
docker ps

# Check container logs
docker logs catalog-service

# Test database connectivity from container
docker exec -it catalog-service curl http://localhost:8080/health/detailed
```

### Environment Variable Issues
```bash
# Check environment variables in container
docker exec -it catalog-service env | grep SQL

# Verify connection string format
docker exec -it catalog-service sh
echo $SQL_CONNECTION_STRING
```

## ?? Updates and Maintenance

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Update Credentials
```bash
# Update .env file
nano .env

# Restart container
docker-compose restart
```

This setup ensures your sensitive credentials are never exposed in your Git repository while providing flexible deployment options for different environments.