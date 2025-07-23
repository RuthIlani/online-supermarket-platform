// schemas/orderSummarySchema.js - Order summary embedded schema
const mongoose = require('mongoose');

const orderSummarySchema = new mongoose.Schema({
  totalItems: {
    type: Number,
    required: [true, 'Total items is required'],
    min: [1, 'Total items must be at least 1']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0.01, 'Total amount must be at least 0.01']
  }
}, { 
  _id: false 
});

// Method to calculate totals from products array
orderSummarySchema.methods.calculateTotals = function(products) {
  if (!products || products.length === 0) {
    throw new Error('Products array is required to calculate totals');
  }
  
  // Calculate total items
  this.totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  
  // Calculate total amount
  this.totalAmount = products.reduce((sum, product) => sum + product.totalPrice, 0);
  
  // Round to 2 decimal places
  this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  
  return this;
};

// Method to validate summary against products
orderSummarySchema.methods.validateSummary = function(products) {
  const errors = [];
  
  if (!products || products.length === 0) {
    errors.push('Products array is required for validation');
    return errors;
  }
  
  // Calculate expected values
  const expectedItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const expectedAmount = Math.round(products.reduce((sum, product) => sum + product.totalPrice, 0) * 100) / 100;
  
  // Validate total items
  if (this.totalItems !== expectedItems) {
    errors.push(`Total items mismatch. Expected: ${expectedItems}, Got: ${this.totalItems}`);
  }
  
  // Validate total amount (allow small rounding differences)
  if (Math.abs(this.totalAmount - expectedAmount) > 0.01) {
    errors.push(`Total amount mismatch. Expected: ${expectedAmount}, Got: ${this.totalAmount}`);
  }
  
  return errors;
};

module.exports = orderSummarySchema;