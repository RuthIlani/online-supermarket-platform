# E-Commerce Product Catalog API

This project is a .NET 8 ASP.NET Core Web API for an e-commerce product catalog service.

## Features
- ASP.NET Core 8 Web API
- Entity Framework Core with SQL Server
- Swagger/OpenAPI documentation
- Health checks endpoint
- CORS enabled for React frontend (http://localhost:3000)
- Seed data for 3 categories (אלקטרוניקה, ביגוד, ספרים) and 9 products

## Endpoints
- `/api/categories` - Get all categories with products
- `/api/categories/{id}` - Get specific category
- `/api/categories/{id}/products` - Get products by category
- `/api/products` - Get all products
- `/api/products/{id}` - Get specific product
- `/health` - Health check

## Getting Started
1. Update the connection string in `appsettings.json` if needed.
2. Run database migrations: `dotnet ef database update`
3. Start the API: `dotnet run`

## NuGet Packages
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- Swashbuckle.AspNetCore
- Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore
