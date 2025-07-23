const express = require('express');
const router = express.Router();

const { createOrder, createTestOrder } = require('../controllers/orderController');
const { validateCreateOrder } = require('../middleware/order/orderValidation');

// Route for creating new order
// POST /api/orders
router.post('/', validateCreateOrder, createOrder);

// Development/Testing route for creating test order
if (process.env.NODE_ENV === 'development') {
  // POST /api/orders/test
  router.post('/test', createTestOrder);
}

module.exports = router;