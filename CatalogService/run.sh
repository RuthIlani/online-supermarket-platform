#!/bin/bash

echo "?? Starting Catalog Service..."
echo "================================="

# Pull the latest image
echo "?? Pulling latest image..."
docker pull ilani/online-supermarket-platform:latest

# Stop and remove existing container if it exists
if [ "$(docker ps -q -f name=catalog-service)" ]; then
    echo "?? Stopping existing container..."
    docker stop catalog-service
fi

if [ "$(docker ps -aq -f name=catalog-service)" ]; then
    echo "???  Removing existing container..."
    docker rm catalog-service
fi

# Run the container
echo "?? Starting new container..."
docker run -d \
  --name catalog-service \
  -p 8080:8080 \
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  --restart unless-stopped \
  ilani/online-supermarket-platform:latest

# Wait a moment for the service to start
echo "? Waiting for service to start..."
sleep 5

# Check if the service is running
if [ "$(docker ps -q -f name=catalog-service)" ]; then
    echo "? Service started successfully!"
    echo ""
    echo "?? Available endpoints:"
    echo "   ?? Swagger UI:    http://localhost:8080/swagger"
    echo "   ??  Health Check:  http://localhost:8080/health"
    echo "   ?? Products API:  http://localhost:8080/api/products"
    echo "   ?? Categories API: http://localhost:8080/api/categories"
    echo ""
    echo "?? Useful commands:"
    echo "   View logs:      docker logs catalog-service"
    echo "   Stop service:   docker stop catalog-service"
    echo "   Remove service: docker rm catalog-service"
else
    echo "? Failed to start service"
    echo "?? Check logs with: docker logs catalog-service"
    exit 1
fi