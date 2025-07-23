
const orderIndexes = require('./orderIndexes');
const orderMethods = require('./orderMethods');

const orderMiddleware = require('../../middleware/order/orderMiddleware');

// Import the main Order model from the correct path
const Order = require('./order');

module.exports = {
  // Main model
  Order,
  
  // Components
  orderIndexes,
  orderMethods,
  orderMiddleware
};