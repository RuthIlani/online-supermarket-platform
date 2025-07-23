# System Design Document - Digital Shopping Platform

## Executive Summary

**Digital Shopping Platform for Supermarket**

The system provides an end-to-end solution for digital shopping, enabling customers to select products by categories and place orders online. The platform consists of an intuitive user interface for product selection and an advanced order management system, addressing the supermarket's business needs in the digital era.

## Technology Stack Overview

| Component | Technology | Purpose |
|-----------|------------|---------|
| Client-Side | React + Redux Toolkit | Dynamic and responsive user interface |
| Backend - Products | .NET 8 + Entity Framework | Categories and products management |
| Backend - Orders | Node.js + Express | Order management |
| Database - Products | SQL Server | Product data storage |
| Database - Orders | MongoDB | Order data storage |
| Cloud Platform | GCP | Cloud infrastructure |

## System Architecture

### High-Level Overview

The system consists of three main components:

1. **Client Application** - React application with Redux for state management
2. **Products Service** - .NET service for managing products and categories
3. **Orders Service** - Node.js service for order management

### Detailed Component Description

#### 1. Client Application (React + Redux)
- **Purpose**: User interface for both main screens
- **Technologies**: React, Redux Toolkit
- **Functionality**:
  - Shopping list screen - product selection by categories
  - Order summary screen - user details input and order confirmation

#### 2. Products Service (.NET 8)
- **Purpose**: Managing product and category data
- **Technologies**: .NET 8, Entity Framework, SQL Server
- **Functionality**:
  - Fetching categories list
  - Fetching products by category
  - REST API for client service

#### 3. Orders Service (Node.js)
- **Purpose**: Managing order process and data persistence
- **Technologies**: Node.js, Express, MongoDB
- **Functionality**:
  - Receiving order data from client
  - Saving customer details and selected products
  - REST API for order confirmation

## User Flow

### Screen 1 - Shopping List
1. Page load - fetch categories and products from server
2. Select category from list
3. Select product and modify quantity
4. Add product to cart + display on screen
5. Navigate to order screen

### Screen 2 - Order Summary
1. Display form with three mandatory fields:
   - First and last name
   - Full address
   - Email
2. Display list of selected products
3. Confirm order and send to server
4. Save order in MongoDB

## Implementation Status

### Currently Implemented
- [List implemented features here]

### Future Implementation
- [List planned features here]

---

*This document is under continuous development and will be updated according to project progress*