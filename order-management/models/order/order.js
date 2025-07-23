// models/Order.js - Clean main Order model
const mongoose = require('mongoose');

// Import embedded schemas
const customerSchema = require('../../schemas/customerSchema');
const productSchema = require('../../schemas/productSchema');
const orderSummarySchema = require('../../schemas/orderSummarySchema');

// Import separated components
const { applyMiddleware } = require('../../middleware/order/orderMiddleware');
const { applyIndexes } = require('./orderIndexes');
const { applyInstanceMethods } = require('./orderMethods');

// Main Order schema definition
const orderSchema = new mongoose.Schema({
  // Unique order identifier
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    }
  },
  
  // Customer information (embedded)
  customer: {
    type: customerSchema,
    required: [true, 'Customer information is required']
  },
  
  // Products array (embedded)
  products: {
    type: [productSchema],
    validate: {
      validator: function(products) {
        return products && products.length > 0;
      },
      message: 'At least one product is required'
    }
  },
  
  // Order summary (embedded)
  orderSummary: {
    type: orderSummarySchema,
    required: [true, 'Order summary is required']
  },
  
  // Order metadata
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  }, 
  
  trackingNumber: {
    type: String,
    trim: true
  },
  
  deliveryDate: {
    type: Date
  },
  
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

console.log('🔧 Building Order model with separated components...');

applyIndexes(orderSchema);
applyMiddleware(orderSchema);
applyInstanceMethods(orderSchema);

console.log('✅ Order model built successfully with all components');

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;