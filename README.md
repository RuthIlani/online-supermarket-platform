# Online Supermarket Platform 🛒

**A modern e-commerce platform built with microservices architecture featuring React/Redux frontend, .NET Core catalog service, and Node.js order management.**

## 🚀 Quick Start (2 Minutes Setup)

**Want to run this immediately? Choose your preferred method:**

### ⚡ Option 1: One-Command Setup

**Windows:**
```bash
# Download and run setup script
curl -L -o quick-setup.bat https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/quick-setup.bat && quick-setup.bat
```

**Mac/Linux:**
```bash
# Download and run setup script
curl -L -o quick-setup.sh https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/quick-setup.sh && chmod +x quick-setup.sh && ./quick-setup.sh
```

### ⚡ Option 2: Manual Setup (3 Commands)

```bash
# 1. Create project and download files
mkdir supermarket-demo && cd supermarket-demo
curl -L -o docker-compose.yml https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/docker-compose.hub.yml
curl -L -o .env https://raw.githubusercontent.com/RuthIlani/online-supermarket-platform/main/infrastructure/.env

# 2. Start the application
docker-compose up -d

# 3. Access your app
# 🛒 Shopping Website: http://localhost:3000
# 🔧 API Health: http://localhost:7083/health
```

### ⚡ Option 3: Clone and Run

```bash
git clone https://github.com/RuthIlani/online-supermarket-platform.git
cd online-supermarket-platform
# See QUICK_START.md for detailed instructions
```

---

## 📱 What You Get

- **🛒 Shopping Frontend** - Modern React app with Hebrew product catalog
- **🔧 Catalog API** - .NET Core service with real product data
- **🗄️ Cloud Database** - GCP SQL Server with sample data
- **🐳 Docker Ready** - Containerized and production-ready

---

## 🏗️ Architecture

This platform uses microservices architecture:
