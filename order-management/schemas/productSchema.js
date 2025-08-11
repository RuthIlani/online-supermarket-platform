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
    required: [true, 'Unit price is required'],
    min: [0.01, 'Unit price must be at least 0.01'],
    max: [100000, 'Unit price cannot exceed 100000']
  },
  totalPrice: {
    type: Number,
    min: [0.01, 'Total price must be at least 0.01']
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
  
  if (!this.unitPrice || this.unitPrice < 0.01) {
    errors.push('Unit price must be at least 0.01');
  }
  
  // Check if total price matches calculation
  const expectedTotal = Math.round(this.quantity * this.unitPrice * 100) / 100;
  if (this.totalPrice && Math.abs(this.totalPrice - expectedTotal) > 0.01) {
    errors.push(`Total price mismatch. Expected: ${expectedTotal}, Got: ${this.totalPrice}`);
  }
  
  return errors;
};

module.exports = productSchema;