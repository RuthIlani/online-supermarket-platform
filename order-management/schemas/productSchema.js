// schemas/productSchema.js - Product embedded schema
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    trim: true
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  categoryId: {
    type: String,
    required: [true, 'Category ID is required'],
    trim: true
  },
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    max: [1000, 'Quantity cannot exceed 1000']
  },
  unitPrice: {
  type: Number,
  // Client must NOT send this; server always fetches authoritative price from CatalogService
  min: [0.01, 'Unit price must be at least 0.01'],
  max: [100000, 'Unit price cannot exceed 100000']
  },
  totalPrice: {
    type: Number,
    min: [0.01, 'Total price must be at least 0.01'],
    // Ignore client-provided totalPrice: always recalculate server-side
    set: function(_) {
      // Prevent setting from client payload
      return this.totalPrice;
    }
  }
}, { 
  _id: false 
});

// Method to calculate total price
productSchema.methods.calculateTotal = function() {
  this.totalPrice = Math.round(this.quantity * this.unitPrice * 100) / 100;
  return this.totalPrice;
};

// Method to validate product data
productSchema.methods.validateData = function() {
  const errors = [];
  
  if (!this.productId || this.productId.trim().length === 0) {
    errors.push('Product ID is required');
  }
  
  if (!this.productName || this.productName.trim().length < 2) {
    errors.push('Product name must be at least 2 characters');
  }
  
  if (!this.categoryId || this.categoryId.trim().length === 0) {
    errors.push('Category ID is required');
  }
  
  if (!this.categoryName || this.categoryName.trim().length < 2) {
    errors.push('Category name must be at least 2 characters');
  }
  
  if (!this.quantity || this.quantity < 1) {
    errors.push('Quantity must be at least 1');
  }
  
  // unitPrice is always populated server-side; no client-side validation needed here
  
  // totalPrice will be calculated server-side; no need to validate client-provided value
  
  return errors;
};

module.exports = productSchema;