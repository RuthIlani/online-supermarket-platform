
const orderIndexes = require('./orderIndexes');
const orderMethods = require('./orderMethods');

const orderMiddleware = require('../../middleware/order/orderMiddleware');

const orderHelpers = require('../../utils/order/orderHelpers');

// Import the main Order model from the correct path
const Order = require('./order');

module.exports = {
  // Main model
  Order,
  
  // Components
  orderIndexes,
  orderMethods,
  orderMiddleware,
  
  // Utilities
  orderHelpers,
  
  // Quick access to commonly used functions
  helpers: {
    generateOrderId: orderHelpers.generateOrderId,
    formatCurrency: orderHelpers.formatCurrency,
    formatDate: orderHelpers.formatDate,
    validateOrderId: orderHelpers.validateOrderId,
    calculateProductTotal: orderHelpers.calculateProductTotal
  }
};