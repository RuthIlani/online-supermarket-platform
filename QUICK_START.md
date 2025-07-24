# 🚀 Quick Start - Online Supermarket Platform

**Run the complete supermarket application in under 2 minutes!**

> ⚠️ **Important**: This guide uses placeholder values for database connections. Contact the project owner to get the actual connection strings for:
> - `YOUR_SQL_CONNECTION_STRING_HERE` (for catalog-service)
> - `YOUR_MONGODB_CONNECTION_STRING_HERE` (for order-management)

## 📋 What You Need
- Docker installed on your computer
- Internet connection
- 2 minutes of your time ⏰

## ⚡ Super Quick Setup

### Option A: Single Docker Commands (Simplest) 🥇

**⚠️ Note: Replace the database credentials with the ones provided by the project owner**

```bash
# Run the API service
docker run -d \
  --name catalog-service \
  -p 7083:8080 \
  -e SQL_CONNECTION_STRING="Server=YOUR_SERVER_IP,1433;Database=YOUR_DATABASE;User Id=YOUR_USERNAME;Password=YOUR_PASSWORD;Encrypt=true;TrustServerCertificate=true;" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  ilani/online-supermarket-catalog-service:latest

# Run the shopping app
docker run -d \
  --name shopping-app \
  -p 3000:80 \
  ilani/online-supermarket-shopping-app:latest
```

**Example with demo credentials:**
```bash
# Run the API service (replace with real credentials)
docker run -d \
  --name catalog-service \
  -p 7083:8080 \
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  ilani/online-supermarket-catalog-service:latest

# Run the shopping app
docker run -d \
  --name shopping-app \
  -p 3000:80 \
  ilani/online-supermarket-shopping-app:latest

# Run the order management service
docker run -d \
  --name order-management \
  -p 3001:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI="YOUR_MONGODB_CONNECTION_STRING_HERE" \
  ilani/order-management:latest
```

**Windows PowerShell version:**
```powershell
# Run the API service
docker run -d --name catalog-service -p 7083:8080 -e "SQL_CONNECTION_STRING=YOUR_SQL_CONNECTION_STRING_HERE" -e "ASPNETCORE_ENVIRONMENT=Production" ilani/online-supermarket-catalog-service:latest

# Run the shopping app  
docker run -d --name shopping-app -p 3000:80 ilani/online-supermarket-shopping-app:latest

# Run the order management service
docker run -d --name order-management -p 3001:3000 -e "NODE_ENV=production" -e "MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE" ilani/order-management:latest
```

### Option B: Using Docker Compose (Fastest) ⭐

```bash
# Step 1: Create a folder
mkdir supermarket-app
cd supermarket-app

# Step 2: Create docker-compose.yml file
cat > docker-compose.yml << 'EOF'
services:
  catalog-service:
    image: ilani/online-supermarket-catalog-service:latest
    container_name: catalog-service
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - SQL_CONNECTION_STRING=YOUR_SQL_CONNECTION_STRING_HERE
      - ASPNETCORE_URLS=http://+:8080
    ports:
      - "7083:8080"
    networks:
      - supermarket-network
    restart: unless-stopped

  shopping-app:
    image: ilani/online-supermarket-shopping-app:latest
    container_name: online-supermarket-shopping-app
    ports:
      - "3000:80"
    depends_on:
      - catalog-service
    environment:
      - NODE_ENV=production
    networks:
      - supermarket-network
    restart: unless-stopped

  order-management:
    image: ilani/order-management:latest
    container_name: order-management
    environment:
      - NODE_ENV=production
      - MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
    ports:
      - "3001:3000"
    networks:
      - supermarket-network
    restart: unless-stopped

networks:
  supermarket-network:
    driver: bridge
EOF

# Step 3: Start the application
docker-compose up -d
```

**Windows PowerShell users, use this instead:**
```powershell
# Create docker-compose.yml file
@"
services:
  catalog-service:
    image: ilani/online-supermarket-catalog-service:latest
    container_name: catalog-service
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - SQL_CONNECTION_STRING=YOUR_SQL_CONNECTION_STRING_HERE
      - ASPNETCORE_URLS=http://+:8080
    ports:
      - "7083:8080"
    networks:
      - supermarket-network
    restart: unless-stopped

  shopping-app:
    image: ilani/online-supermarket-shopping-app:latest
    container_name: online-supermarket-shopping-app
    ports:
      - "3000:80"
    depends_on:
      - catalog-service
    environment:
      - NODE_ENV=production
    networks:
      - supermarket-network
    restart: unless-stopped

  order-management:
    image: ilani/order-management:latest
    container_name: order-management
    environment:
      - NODE_ENV=production
      - MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
    ports:
      - "3001:3000"
    networks:
      - supermarket-network
    restart: unless-stopped

networks:
  supermarket-network:
    driver: bridge
"@ | Out-File -FilePath docker-compose.yml -Encoding UTF8

# Start the application
docker-compose up -d
```

### Option B: Clone the Repository

```bash
# Step 1: Clone the project
git clone https://github.com/RuthIlani/online-supermarket-platform.git
cd online-supermarket-platform/infrastructure

# Step 2: Copy environment file
cp .env.example .env

# Step 3: Start with pre-built images (fast)
docker-compose -f docker-compose.hub.yml up -d
```

## 🎯 Access Your Application

After running the commands above:

- **🛒 Shopping Website**: http://localhost:3000
- **🔧 API Health Check**: http://localhost:7083/health
- **📦 API Products**: http://localhost:7083/api/products
- **📊 API Categories**: http://localhost:7083/api/categories
- **🛍️ Order Management**: http://localhost:3001

## ✅ Verify Everything Works

Run these commands to test:

```bash
# Check if services are running
docker ps

# Test the API
curl http://localhost:7083/health

# Check logs if needed
docker-compose logs
```

## 🛑 Having Issues?

### Port Already in Use?
```bash
# Stop any existing containers
docker stop $(docker ps -q)
# Then try again
docker-compose up -d
```

### Can't Access the Website?
- Make sure Docker is running
- Check if ports 3000 and 7083 are free
- Try: http://localhost:3000 and http://localhost:7083/health

### Database Connection Issues?
The app uses a cloud database that should work automatically. If not:
- Check your internet connection
- Try restarting the containers: `docker-compose restart`

## 🔄 Stop the Application

When you're done testing:

```bash
# Stop all services
docker-compose down

# Stop and remove everything (clean slate)
docker-compose down --volumes --remove-orphans
```

## 📱 What You'll See

### Shopping Website (Port 3000)
- Modern React frontend
- Product catalog with Hebrew products
- Shopping cart functionality
- Responsive design

### API (Port 7083)
- RESTful API with product data
- Health monitoring endpoints
- Real-time data from cloud database

## 🎉 That's It!

You now have a full-stack e-commerce application running locally with:
- ✅ React frontend
- ✅ .NET Core API backend  
- ✅ Cloud SQL Server database
- ✅ Docker containerization
- ✅ Production-ready setup

**Want to modify the code?** Clone the full repository and start developing!

**Want to deploy to production?** Check out the deployment guides in the `infrastructure/` folder.

---

**Need help?** Create an issue in the GitHub repository or contact the project maintainer.
