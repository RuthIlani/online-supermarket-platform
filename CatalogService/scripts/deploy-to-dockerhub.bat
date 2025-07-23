@echo off
REM Docker Hub Deployment Script for Windows
REM This script builds and pushes your Catalog Service to Docker Hub

setlocal enabledelayedexpansion

REM Configuration
if "%DOCKER_USERNAME%"=="" set DOCKER_USERNAME=ilani
set IMAGE_NAME=online-supermarket-platform
if "%VERSION%"=="" set VERSION=latest

echo ?? Building and Pushing Catalog Service to Docker Hub
echo ==================================================

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ? Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Build the Docker image
echo ?? Building Docker image...
docker build -t "%DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%" .
if errorlevel 1 (
    echo ? Failed to build Docker image
    exit /b 1
)

REM Tag as latest if this is a versioned build
if not "%VERSION%"=="latest" (
    docker tag "%DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%" "%DOCKER_USERNAME%/%IMAGE_NAME%:latest"
)

REM Push to Docker Hub
echo ??  Pushing to Docker Hub...
docker push "%DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%"
if errorlevel 1 (
    echo ? Failed to push Docker image
    exit /b 1
)

if not "%VERSION%"=="latest" (
    docker push "%DOCKER_USERNAME%/%IMAGE_NAME%:latest"
)

echo ? Successfully pushed to Docker Hub!
echo.
echo ?? Your image is now available at:
echo    docker pull %DOCKER_USERNAME%/%IMAGE_NAME%:%VERSION%
echo    docker pull %DOCKER_USERNAME%/%IMAGE_NAME%:latest
echo.
echo ?? View on Docker Hub:
echo    https://hub.docker.com/r/%DOCKER_USERNAME%/%IMAGE_NAME%

pause