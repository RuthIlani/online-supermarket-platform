# Quick Start Guide for Friends 🚀

**Want to run the Online Supermarket Platform in 2 minutes? Here are the fastest options:**

## ⚡ Option 1: Super Quick (Docker Hub - Recommended)

Your friend needs just **3 commands**:

```bash
# 1. Create project folder and download files
mkdir supermarket-demo && cd supermarket-demo
curl -L -o docker-compose.yml https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/docker-compose.hub.yml
curl -L -o .env.example https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/.env.example

# 2. Set up environment (copy and edit with real database credentials)
cp .env.example .env
# Edit .env with your GCP database details

# 3. Run the application
docker-compose up -d
```

**That's it! Application will be running at:**
- 🛒 **Shopping App**: http://localhost:3000
- 🔧 **API**: http://localhost:7083/health

---

## ⚡ Option 2: Clone and Run

If your friend wants the full source code:

```bash
# 1. Clone the repository
git clone https://github.com/RuthIlani/online-supermarket-platform.git
cd online-supermarket-platform/infrastructure

# 2. Set up environment
cp .env.example .env
# Edit .env with real database credentials

# 3. Run with Docker Hub images (fastest)
docker-compose -f docker-compose.hub.yml up -d

# OR build from source (slower, but latest code)
docker-compose up -d
```

---

## ⚡ Option 3: One-Command Demo (Public Database)

For quick testing without database setup:

```bash
# Single command deployment with demo database
docker run -d --name catalog-demo -p 7083:8080 \
  -e SQL_CONNECTION_STRING="Server=35.224.255.219,1433;Database=SupermarketCatalog;User Id=sqlserver;Password=superSqlServer;Encrypt=true;TrustServerCertificate=true;" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  ilani/online-supermarket-catalog-service:latest && \
docker run -d --name shopping-demo -p 3000:80 \
  ilani/online-supermarket-shopping-app:latest
```

---

## 📋 Prerequisites

Your friend needs:
- ✅ **Docker** installed ([Get Docker](https://docs.docker.com/get-docker/))
- ✅ **Internet connection**
- ✅ **5 minutes** ⏰

**Windows users:** Use PowerShell or Command Prompt  
**Mac/Linux users:** Use Terminal

---

## 🔧 Environment Setup (.env file)

Your friend needs to edit the `.env` file with real database credentials:

```bash
# GCP Cloud SQL Configuration
SQL_CONNECTION_STRING=Server=35.224.255.219,1433;Database=SupermarketCatalog;User Id=sqlserver;Password=superSqlServer;Encrypt=true;TrustServerCertificate=true;

# Application Settings
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:8080
```

---

## ✅ Verification Steps

After running, your friend should check:

1. **Health Check**: `curl http://localhost:7083/health`
2. **API Products**: `curl http://localhost:7083/api/products`
3. **Web App**: Open http://localhost:3000 in browser

---

## 🛑 Troubleshooting

**Common issues and quick fixes:**

1. **Port already in use:**
   ```bash
   # Stop existing containers
   docker stop $(docker ps -q)
   ```

2. **Database connection failed:**
   - Check `.env` file has correct database credentials
   - Verify GCP SQL instance is running

3. **Docker not found:**
   - Install Docker Desktop from https://docs.docker.com/get-docker/

4. **Images not pulling:**
   ```bash
   # Login to Docker Hub (if needed)
   docker login
   ```

---

# Secure Configuration Guide

This guide shows you how to securely configure the online supermarket platform with GCP Cloud SQL without exposing secrets in your GitHub repository.

## 🔒 Security Principles

- **Never commit secrets to Git** - Use `.gitignore` to exclude sensitive files
- **Use environment variables** - Keep secrets separate from code
- **Layer security** - Different approaches for development vs production

## 🚀 Deployment Options

### Option 1: Local Development with .env File (Current Setup)

#### Setup Instructions:

1. **Copy the environment template:**
   ```bash
   cd infrastructure
   cp .env.example .env
   ```

2. **Edit `.env` with your actual GCP credentials:**
   ```bash
   # Edit this file with your real database credentials
   notepad .env
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

#### Pros:
- ✅ Simple setup for development
- ✅ Secrets not in Git
- ✅ Easy to share template with team

#### Cons:
- ⚠️ Need to manually manage .env file
- ⚠️ Not suitable for production CI/CD

---

### Option 2: Environment Variables (Production)

For production deployments, set environment variables directly in your hosting platform:

#### Docker Runtime:
```bash
docker run -d \
  --name catalog-service \
  -p 7083:8080 \
  -e SQL_CONNECTION_STRING="Server=YOUR_IP,1433;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASS;Encrypt=true;TrustServerCertificate=true;" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e ASPNETCORE_URLS=http://+:8080 \
  your-registry/catalog-service:latest
```

#### Azure Container Instances:
```bash
az container create \
  --resource-group myResourceGroup \
  --name catalog-service \
  --image your-registry/catalog-service:latest \
  --environment-variables \
    SQL_CONNECTION_STRING="Server=..." \
    ASPNETCORE_ENVIRONMENT=Production
```

#### Google Cloud Run:
```bash
gcloud run deploy catalog-service \
  --image your-registry/catalog-service:latest \
  --set-env-vars="SQL_CONNECTION_STRING=Server=...,ASPNETCORE_ENVIRONMENT=Production"
```

#### AWS ECS Task Definition:
```json
{
  "environment": [
    {
      "name": "SQL_CONNECTION_STRING",
      "value": "Server=YOUR_IP,1433;..."
    },
    {
      "name": "ASPNETCORE_ENVIRONMENT", 
      "value": "Production"
    }
  ]
}
```

---

### Option 3: Cloud Secret Managers (Most Secure)

#### Azure Key Vault:
```csharp
// In Program.cs - add Key Vault integration
if (builder.Environment.IsProduction())
{
    var keyVaultURL = Environment.GetEnvironmentVariable("KEY_VAULT_URL");
    builder.Configuration.AddAzureKeyVault(new Uri(keyVaultURL), new DefaultAzureCredential());
}
```

#### Google Secret Manager:
```csharp
// Add Google Secret Manager package and configuration
builder.Configuration.AddGoogleSecretManager("your-project-id");
```

#### AWS Secrets Manager:
```csharp
// Add AWS Secrets Manager integration
builder.Configuration.AddSecretsManager(region: Amazon.RegionEndpoint.USEast1);
```

---

### Option 4: CI/CD with GitHub Secrets

For automated deployments, use GitHub repository secrets:

1. **Add secrets to GitHub repository:**
   - Go to repository → Settings → Secrets and variables → Actions
   - Add: `SQL_CONNECTION_STRING`, `ASPNETCORE_ENVIRONMENT`, etc.

2. **GitHub Actions workflow example:**
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
         
         - name: Deploy to Azure
           env:
             SQL_CONNECTION_STRING: ${{ secrets.SQL_CONNECTION_STRING }}
             ASPNETCORE_ENVIRONMENT: Production
           run: |
             # Your deployment commands here
             az container create \
               --environment-variables \
               SQL_CONNECTION_STRING="$SQL_CONNECTION_STRING" \
               ASPNETCORE_ENVIRONMENT="$ASPNETCORE_ENVIRONMENT"
   ```

---

## 🔧 Current File Structure

```
infrastructure/
├── .env.example          # Template (safe to commit)
├── .env                  # Your actual secrets (never commit)
├── .gitignore           # Protects .env from being committed
├── docker-compose.yml   # No secrets - uses env_file
└── README.md           # This guide
```

## ⚠️ Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] No secrets in `docker-compose.yml`
- [ ] Using strong database passwords
- [ ] GCP SQL instance has proper firewall rules
- [ ] Using encrypted connections (`Encrypt=true`)
- [ ] Regular credential rotation planned

## 🚨 If You Accidentally Committed Secrets

1. **Immediately rotate the credentials** in GCP
2. **Remove from Git history:**
   ```bash
   # Remove file from Git history (use carefully!)
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch path/to/secret/file' \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (coordinate with team first)
4. **Update all deployment configurations** with new credentials

## 🔍 Testing Your Security

1. **Check what's being committed:**
   ```bash
   git status
   git diff --cached
   ```

2. **Verify .env is ignored:**
   ```bash
   git check-ignore .env
   # Should output: .env
   ```

3. **Test environment loading:**
   ```bash
   docker-compose config
   # Should show environment variables are loaded
   ```
