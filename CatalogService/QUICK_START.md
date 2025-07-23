# ?? Quick Start - Catalog Service

## **Super Simple - One Command Run**

```bash
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="Server=35.224.255.219,1433;Database=SupermarketCatalog;User Id=sqlserver;Password=superSqlServer;Encrypt=true;TrustServerCertificate=true;" \
  ilani/online-supermarket-platform:latest

# Open: http://localhost:8080/swagger
```

## **Even Simpler - Download and Run**

### **Linux/macOS:**
```bash
curl -o run.sh https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/run.sh
chmod +x run.sh
./run.sh
```

### **Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/run.ps1" -OutFile "run.ps1"
.\run.ps1
```

### **Windows (Command Prompt):**
```cmd
curl -o run.bat https://raw.githubusercontent.com/ilani/online-supermarket-platform/main/CatalogService/run.bat
run.bat
```

## **Available Endpoints**

After running, access these URLs:
- ?? **API Documentation**: http://localhost:8080/swagger
- ?? **Health Check**: http://localhost:8080/health
- ?? **Products API**: http://localhost:8080/api/products
- ?? **Categories API**: http://localhost:8080/api/categories

## **Stop the Service**

```bash
docker stop catalog-service
docker rm catalog-service
```

## **Requirements**

- Docker installed on your machine
- Internet connection (to download the image)

That's it! ??