# Use official Node.js runtime as base image
FROM node:18-alpine as build

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Set environment variable for production build
ARG REACT_APP_CATALOG_API_URL=http://catalog-service:8080/api
ENV REACT_APP_CATALOG_API_URL=$REACT_APP_CATALOG_API_URL

# Build the React app
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine

# Copy built app from build stage to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
