# Cloud Architecture - Online Shopping Platform

## Overview

The Online Shopping Platform is deployed on Google Cloud Platform (GCP) using a containerized microservices architecture. The system leverages Cloud Run for serverless container deployment, ensuring scalability, cost-efficiency, and simplified management.

## Implementation Status

### Currently Implemented ✅
- **React Application** - Fully implemented with Docker containerization
- **.NET Products Service** - Implemented with Docker containerization  
- **Node.js Orders Service** - Implemented and functional
- **Cloud SQL** - Configured and operational in GCP
- **MongoDB Atlas** - Account created and storing order data

### Future Implementation 🔄
- Complete GCP deployment pipeline
- CI/CD automation with Cloud Build
- Monitoring and logging setup
- Security hardening and SSL certificates

## GCP Architecture Overview

The system is designed to run on Google Cloud Platform using containerized microservices architecture with the following key components:

- **Cloud Run** - Serverless container platform for all services
- **Cloud Load Balancer** - Traffic distribution and SSL termination
- **Cloud Build** - CI/CD pipeline automation
- **Cloud SQL** - Managed PostgreSQL/MySQL for product data
- **MongoDB Atlas** - Cloud database for order management
- **Cloud Storage** - Static assets and backups

## Architecture Diagram

```
                         ┌─────────────────┐
                         │   Internet      │
                         │   Users         │
                         └─────────┬───────┘
                                   │
                         ┌─────────▼───────┐
                         │  Cloud Load     │
                         │  Balancer       │
                         │  (HTTPS/SSL)     │
                         └─────────┬───────┘
                                   │
                         ┌─────────▼───────┐
                         │   Cloud Run     │
                         │  React App      │
                         │  (Frontend)     │
                         └─────────┬───────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
         ┌─────────▼───────┐ ┌─────▼─────┐ ┌──────▼──────┐
         │   Cloud Run     │ │ Cloud Run │ │   Cloud     │
         │  .NET Service   │ │ Node.js   │ │   Build     │
         │  (Products)     │ │ Service   │ │  (CI/CD)    │
         │                 │ │ (Orders)  │ │             │
         └─────────┬───────┘ └─────┬─────┘ └─────────────┘
                   │               │
         ┌─────────▼───────┐ ┌─────▼─────┐
         │   Cloud SQL     │ │ MongoDB   │
         │  (Products DB)  │ │  Atlas    │
         │                 │ │(Orders DB)│
         └─────────────────┘ └───────────┘

┌─────────────────────────────────────────────────────────────────┐
│            Google Cloud Operations & Security Layer             │
│                    (Cross-cutting concerns)                     │
│   Monitoring │ Logging │ IAM │ Secret Manager │ Security Center  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Roles and Responsibilities

### **Cloud Load Balancer**
- **Purpose**: Entry point for all traffic, SSL termination
- **Features**: 
  - Global load distribution
  - HTTPS certificate management
  - DDoS protection
  - Health checks

### **Cloud Run Services**

#### **React Frontend**
- Containerized React application
- Serves static files and SPA routing
- Auto-scaling based on traffic
- Zero-downtime deployments

#### **.NET Products Service**
- Manages product catalog and categories
- Connects to Cloud SQL database
- RESTful API endpoints
- Entity Framework for data access

#### **Node.js Orders Service**
- Handles order processing and storage
- Connects to MongoDB Atlas
- Order confirmation and validation
- Express.js framework

### **Data Layer**

#### **Cloud SQL**
- Managed relational database service
- Stores product catalog and categories
- Automatic backups and high availability
- Integration with .NET Entity Framework

#### **MongoDB Atlas**
- Cloud-hosted NoSQL database
- Stores order data and customer information
- Global clusters for performance
- Built-in security and monitoring

## DevOps & CI/CD Pipeline

### **Cloud Build Pipeline**

#### **Automation Features**
- Triggered by GitHub repository commits
- Docker image building and testing
- Automated security scanning
- Multi-environment deployments

#### **Build Process**
1. **Source Code** - Pull from GitHub repository
2. **Docker Build** - Create container images for each service
3. **Testing** - Run automated tests and security scans
4. **Registry** - Push images to Google Container Registry
5. **Deployment** - Deploy to Cloud Run services
6. **Monitoring** - Health checks and performance monitoring

#### **Security & Secrets Management**
- Google Secret Manager for sensitive data
- IAM roles and service accounts
- Container image vulnerability scanning
- Network security policies

### **Monitoring & Observability**

#### **Google Cloud Operations Suite**
- **Cloud Logging** - Centralized log aggregation
- **Cloud Monitoring** - Performance metrics and alerting
- **Cloud Trace** - Distributed tracing for microservices
- **Error Reporting** - Automatic error detection and notification

#### **Key Metrics**
- Application performance (response times, throughput)
- Infrastructure health (CPU, memory, disk usage)
- Business metrics (orders placed, conversion rates)
- Security events and anomalies

## Scalability & Performance

### **Auto-scaling**
- Cloud Run automatically scales based on traffic
- Zero to N instances based on demand
- Pay-per-use pricing model
- Cold start optimization

### **Performance Optimization**
- CDN integration for static assets
- Database connection pooling
- Caching strategies (Redis/Memcached)
- Image optimization and compression

## Security Architecture

### **Network Security**
- VPC networks with private subnets
- Firewall rules and security groups
- SSL/TLS encryption in transit
- Private Google Access for internal communication

### **Identity & Access Management**
- Service accounts with minimal permissions
- API key management and rotation
- OAuth 2.0 for user authentication
- Role-based access control (RBAC)

### **Data Protection**
- Encryption at rest for all databases
- Regular automated backups
- Data retention policies
- GDPR compliance considerations

## Cost Optimization

### **Resource Management**
- Serverless architecture reduces idle costs
- Automatic scaling prevents over-provisioning
- Resource quotas and budget alerts
- Regular cost analysis and optimization

### **Monitoring & Budgets**
- Cloud Billing alerts and budgets
- Resource usage tracking
- Cost allocation by service/environment
- Regular architecture reviews for optimization

---

*This architecture document is maintained alongside the main system design and updated with infrastructure changes*
