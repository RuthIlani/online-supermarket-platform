# Online Shopping Platform - Documentation

Welcome to the Online Shopping Platform documentation. This repository contains comprehensive documentation for the entire system architecture, implementation details, and deployment strategies.

## 📚 Documentation Structure

### [System Design Document](./system-design.md)
Complete system architecture and technical specifications including:
- Executive summary and business requirements
- Technology stack overview
- System components and their interactions
- User flow documentation
- Implementation roadmap

### [Cloud Architecture & DevOps](./cloud-architecture.md)
Google Cloud Platform deployment architecture and DevOps practices:
- GCP infrastructure design
- Container orchestration with Cloud Run
- CI/CD pipeline with Cloud Build
- Security and monitoring strategies
- Scalability and performance optimization

## 🏗️ System Overview

The Online Shopping Platform is a modern, microservices-based e-commerce solution built for supermarkets to provide digital shopping experiences. The system consists of:

- **Frontend**: React application with Redux state management
- **Products Service**: .NET 8 API for catalog management
- **Orders Service**: Node.js API for order processing
- **Databases**: Cloud SQL (products) + MongoDB Atlas (orders)
- **Infrastructure**: Google Cloud Platform with containerized deployment

## 🚀 Quick Links

| Component | Technology | Status | Documentation |
|-----------|------------|---------|---------------|
| Frontend | React + Redux | ✅ Implemented | [System Design](./system-design.md#client-application-react--redux) |
| Products API | .NET 8 + EF | ✅ Implemented | [System Design](./system-design.md#products-service-net-8) |
| Orders API | Node.js + Express | 🔄 In Progress | [System Design](./system-design.md#orders-service-nodejs) |
| Cloud Infrastructure | GCP | 🔄 In Progress | [Cloud Architecture](./cloud-architecture.md) |

## 📋 Implementation Status

### ✅ Completed
- React application with Docker containerization
- .NET Products Service with Docker support
- Node.js Orders Service (functional)
- Cloud SQL database setup
- MongoDB Atlas integration

### 🔄 In Progress
- Complete GCP deployment pipeline
- CI/CD automation with Cloud Build
- Monitoring and logging setup

## 🛠️ Getting Started

1. **System Architecture**: Start with the [System Design Document](./system-design.md) for overall architecture understanding
2. **Cloud Deployment**: Review [Cloud Architecture](./cloud-architecture.md) for deployment and infrastructure details
3. **Implementation**: Check the current implementation status and upcoming features

---

*Version: 1.0*