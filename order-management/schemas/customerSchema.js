// schemas/customerSchema.js - Customer embedded schema
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters'],
    minlength: [2, 'Customer name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters'],
    minlength: [10, 'Address must be at least 10 characters']
  }
}, { 
  _id: false // Don't create separate _id for embedded documents
});

// Virtual for full name (for backward compatibility)
customerSchema.virtual('fullName').get(function() {
  return this.name || '';
});

// Virtual to extract first name from full name
customerSchema.virtual('firstName').get(function() {
  if (this.name) {
    return this.name.split(' ')[0] || '';
  }
  return '';
});

// Virtual to extract last name from full name
customerSchema.virtual('lastName').get(function() {
  if (this.name) {
    const nameParts = this.name.split(' ');
    return nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  }
  return '';
});

// Method to validate customer data
customerSchema.methods.validateData = function() {
  const errors = [];
  
  if (!this.name || this.name.trim().length < 2) {
    errors.push('Customer name must be at least 2 characters');
  }
  
  if (!this.email || !this.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (!this.address || this.address.trim().length < 10) {
    errors.push('Address must be at least 10 characters');
  }
  
  return errors;
};

// Ensure virtuals are included in JSON output
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

module.exports = customerSchema;