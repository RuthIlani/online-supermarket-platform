#!/bin/bash

# Docker Hub Deployment Script
# This script builds and pushes your Catalog Service to Docker Hub

set -e  # Exit on any error

# Configuration
DOCKER_USERNAME="${DOCKER_USERNAME:-ilani}"  # Your Docker Hub username
IMAGE_NAME="online-supermarket-platform"     # Your repository name
VERSION="${VERSION:-latest}"

echo "?? Building and Pushing Catalog Service to Docker Hub"
echo "=================================================="

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "? Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build the Docker image
echo "?? Building Docker image..."
docker build -t "${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}" .

# Tag as latest if this is a versioned build
if [ "$VERSION" != "latest" ]; then
    docker tag "${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}" "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

# Push to Docker Hub
echo "??  Pushing to Docker Hub..."
docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

if [ "$VERSION" != "latest" ]; then
    docker push "${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
fi

echo "? Successfully pushed to Docker Hub!"
echo ""
echo "?? Your image is now available at:"
echo "   docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"
echo "   docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:latest"
echo ""
echo "?? View on Docker Hub:"
echo "   https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}"