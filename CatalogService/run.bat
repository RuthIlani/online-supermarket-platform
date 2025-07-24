@echo off
echo ?? Starting Catalog Service...
echo =================================

REM Pull the latest image
echo ?? Pulling latest image...
docker pull ilani/online-supermarket-platform:latest

REM Stop and remove existing container if it exists
docker ps -q --filter name=catalog-service > nul 2>&1
if not errorlevel 1 (
    echo ?? Stopping existing container...
    docker stop catalog-service > nul
)

docker ps -aq --filter name=catalog-service > nul 2>&1
if not errorlevel 1 (
    echo ???  Removing existing container...
    docker rm catalog-service > nul
)

REM Run the container
echo ?? Starting new container...
docker run -d ^
  --name catalog-service ^
  -p 8080:8080 ^
  -e SQL_CONNECTION_STRING="YOUR_SQL_CONNECTION_STRING_HERE" ^
  -e ASPNETCORE_ENVIRONMENT=Production ^
  --restart unless-stopped ^
  ilani/online-supermarket-platform:latest

REM Wait a moment for the service to start
echo ? Waiting for service to start...
timeout /t 5 /nobreak > nul

REM Check if the service is running
docker ps -q --filter name=catalog-service > nul 2>&1
if not errorlevel 1 (
    echo ? Service started successfully!
    echo.
    echo ?? Available endpoints:
    echo    ?? Swagger UI:    http://localhost:8080/swagger
    echo    ??  Health Check:  http://localhost:8080/health
    echo    ?? Products API:  http://localhost:8080/api/products
    echo    ?? Categories API: http://localhost:8080/api/categories
    echo.
    echo ?? Useful commands:
    echo    View logs:      docker logs catalog-service
    echo    Stop service:   docker stop catalog-service
    echo    Remove service: docker rm catalog-service
) else (
    echo ? Failed to start service
    echo ?? Check logs with: docker logs catalog-service
    exit /b 1
)

pause