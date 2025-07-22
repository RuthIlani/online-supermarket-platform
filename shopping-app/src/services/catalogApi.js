import { API_CONFIG, ENDPOINTS } from '../config/apiConfig';

// Helper function to handle API requests with consistent error handling
const makeApiRequest = async (url, errorContext) => {
  try {
    const response = await fetch(url, {
      headers: API_CONFIG.DEFAULT_HEADERS,
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error ${errorContext}:`, error);
    throw error;
  }
};

// Real API service for connecting to the catalog server
const catalogApi = {
  /**
   * Fetch all categories
   * @returns {Promise} Promise resolving to categories array
   */
  fetchCategories: async () => {
    return makeApiRequest(
      `${API_CONFIG.CATALOG_BASE_URL}${ENDPOINTS.CATEGORIES}`,
      'fetching categories'
    );
  },

  /**
   * Fetch category by ID
   * @param {number} id - Category ID
   * @returns {Promise} Promise resolving to category object
   */
  fetchCategoryById: async (id) => {
    return makeApiRequest(
      `${API_CONFIG.CATALOG_BASE_URL}${ENDPOINTS.CATEGORY_BY_ID(id)}`,
      `fetching category ${id}`
    );
  },

  /**
   * Fetch products by category ID
   * @param {number} categoryId - Category ID
   * @returns {Promise} Promise resolving to products array
   */
  fetchProductsByCategory: async (categoryId) => {
    return makeApiRequest(
      `${API_CONFIG.CATALOG_BASE_URL}${ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId)}`,
      `fetching products for category ${categoryId}`
    );
  },

  /**
   * Fetch all products
   * @returns {Promise} Promise resolving to products array
   */
  fetchProducts: async () => {
    return makeApiRequest(
      `${API_CONFIG.CATALOG_BASE_URL}${ENDPOINTS.PRODUCTS}`,
      'fetching products'
    );
  },

  /**
   * Fetch product by ID
   * @param {number} id - Product ID
   * @returns {Promise} Promise resolving to product object
   */
  fetchProductById: async (id) => {
    return makeApiRequest(
      `${API_CONFIG.CATALOG_BASE_URL}${ENDPOINTS.PRODUCT_BY_ID(id)}`,
      `fetching product ${id}`
    );
  },

  /**
   * Fetch both categories and products (for compatibility with existing code)
   * @returns {Promise} Promise resolving to object with categories and products arrays
   */
  fetchCategoriesAndProducts: async () => {
    try {
      const [categories, products] = await Promise.all([
        catalogApi.fetchCategories(),
        catalogApi.fetchProducts()
      ]);
      
      return {
        categories,
        products
      };
    } catch (error) {
      console.error('Error fetching categories and products:', error);
      throw error;
    }
  }
};

export default catalogApi;
