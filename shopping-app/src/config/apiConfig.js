// API Configuration
export const API_CONFIG = {
  // Catalog server endpoints - use environment-based URL
  CATALOG_BASE_URL: process.env.REACT_APP_CATALOG_API_URL || 'https://localhost:7083/api',
  
  // Order processing (mock for now)
  ORDER_BASE_URL: 'mock', // Will be replaced with real order API later
  
  // Request timeout in milliseconds
  REQUEST_TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Endpoints
export const ENDPOINTS = {
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId) => `/categories/${categoryId}/products`,
  PRODUCT_BY_ID: (id) => `/products/${id}`
};
