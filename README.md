# Online Supermarket Platform 🛒

A modern e-commerce platform built with microservices architecture featuring React frontend, .NET Core catalog service, and Node.js order management.

## 🚀 Quick Docker Setup

**Prerequisites:** Docker installed on your machine.

### One-Line Setup Command

**For Windows (PowerShell):**
```powershell
git clone https://github.com/RuthIlani/online-supermarket-platform.git; cd online-supermarket-platform/infrastructure; "SQL_CONNECTION_STRING=Server=[YOUR_SQL_SERVER];Database=[YOUR_DATABASE];User Id=[YOUR_SQL_USER];Password=[YOUR_SQL_PASSWORD];Encrypt=true;TrustServerCertificate=true;" | Out-File .env -Encoding UTF8; "MONGODB_URI=mongodb+srv://[YOUR_MONGO_USER]:[YOUR_MONGO_PASSWORD]@[YOUR_MONGO_CLUSTER]/[YOUR_MONGO_DATABASE]?retryWrites=true&w=majority" | Add-Content .env -Encoding UTF8; docker-compose -f docker-compose.hub.yml up -d
```

**For Mac/Linux:**
```bash
git clone https://github.com/RuthIlani/online-supermarket-platform.git && cd online-supermarket-platform/infrastructure && echo "SQL_CONNECTION_STRING=Server=[YOUR_SQL_SERVER];Database=[YOUR_DATABASE];User Id=[YOUR_SQL_USER];Password=[YOUR_SQL_PASSWORD];Encrypt=true;TrustServerCertificate=true;" > .env && echo "MONGODB_URI=mongodb+srv://[YOUR_MONGO_USER]:[YOUR_MONGO_PASSWORD]@[YOUR_MONGO_CLUSTER]/[YOUR_MONGO_DATABASE]?retryWrites=true&w=majority" >> .env && docker-compose -f docker-compose.hub.yml up -d
```

### Step-by-Step Setup

```bash
# 1. Clone Repository
git clone https://github.com/RuthIlani/online-supermarket-platform.git
cd online-supermarket-platform/infrastructure

# 2. Create Environment File
echo "SQL_CONNECTION_STRING=Server=[YOUR_SQL_SERVER];Database=[YOUR_DATABASE];User Id=[YOUR_SQL_USER];Password=[YOUR_SQL_PASSWORD];Encrypt=true;TrustServerCertificate=true;" > .env
echo "MONGODB_URI=mongodb+srv://[YOUR_MONGO_USER]:[YOUR_MONGO_PASSWORD]@[YOUR_MONGO_CLUSTER]/[YOUR_MONGO_DATABASE]?retryWrites=true&w=majority" >> .env

# 3. Run with Docker
docker-compose -f docker-compose.hub.yml up -d
```

**Note:** Replace all `[YOUR_*]` placeholders with your actual database credentials.

### Step 4: Access the Application
- **Shopping Website**: http://localhost:3000
- **API Health Check**: http://localhost:7083/health
- **Order Management**: http://localhost:3001

### Stop the Application
```bash
docker-compose -f docker-compose.hub.yml down
```

## 📋 Database Setup Requirements

Before running the commands above, you'll need:

1. **SQL Server Database** - Any SQL Server instance with:
   - A database for the catalog service
   - User credentials with read/write access

2. **MongoDB Database** - A MongoDB instance (local or cloud) with:
   - A database for order management
   - Connection string with credentials

Replace the placeholders in the setup commands with your actual database information.

## 🏗️ Architecture

This platform uses microservices architecture:
- **Frontend**: React shopping app (Port 3000)
- **Catalog Service**: .NET Core API (Port 7083)
- **Order Management**: Node.js service (Port 3001)
- **Databases**: SQL Server (catalog) + MongoDB (orders)

## �️ Technology Stack
- **Frontend**: React with Redux
- **Backend**: .NET Core 8.0, Node.js
- **Databases**: SQL Server, MongoDB
- **Containerization**: Docker
- **Cloud**: Google Cloud Platform

---

**That's it! Your supermarket platform should be running in just a few minutes.**
