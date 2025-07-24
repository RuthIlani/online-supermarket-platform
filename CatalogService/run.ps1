Write-Host "?? Starting Catalog Service..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Pull the latest image
Write-Host "?? Pulling latest image..." -ForegroundColor Yellow
docker pull ilani/online-supermarket-platform:latest

# Stop and remove existing container if it exists
$existingContainer = docker ps -q --filter name=catalog-service
if ($existingContainer) {
    Write-Host "?? Stopping existing container..." -ForegroundColor Yellow
    docker stop catalog-service | Out-Null
}

$existingContainer = docker ps -aq --filter name=catalog-service
if ($existingContainer) {
    Write-Host "???  Removing existing container..." -ForegroundColor Yellow
    docker rm catalog-service | Out-Null
}

# Run the container
Write-Host "?? Starting new container..." -ForegroundColor Yellow
docker run -d `
  --name catalog-service `
  -p 8080:8080 `
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" `
  -e ASPNETCORE_ENVIRONMENT=Production `
  --restart unless-stopped `
  ilani/online-supermarket-platform:latest

# Wait a moment for the service to start
Write-Host "? Waiting for service to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check if the service is running
$runningContainer = docker ps -q --filter name=catalog-service
if ($runningContainer) {
    Write-Host "? Service started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "?? Available endpoints:" -ForegroundColor Cyan
    Write-Host "   ?? Swagger UI:    http://localhost:8080/swagger" -ForegroundColor White
    Write-Host "   ??  Health Check:  http://localhost:8080/health" -ForegroundColor White
    Write-Host "   ?? Products API:  http://localhost:8080/api/products" -ForegroundColor White
    Write-Host "   ?? Categories API: http://localhost:8080/api/categories" -ForegroundColor White
    Write-Host ""
    Write-Host "?? Useful commands:" -ForegroundColor Cyan
    Write-Host "   View logs:      docker logs catalog-service" -ForegroundColor White
    Write-Host "   Stop service:   docker stop catalog-service" -ForegroundColor White
    Write-Host "   Remove service: docker rm catalog-service" -ForegroundColor White
} else {
    Write-Host "? Failed to start service" -ForegroundColor Red
    Write-Host "?? Check logs with: docker logs catalog-service" -ForegroundColor Yellow
    exit 1
}

Read-Host "Press Enter to continue..."