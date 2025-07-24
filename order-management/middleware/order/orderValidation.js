// middleware/orderValidation.js - Order validation middleware
const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('❌ Validation errors found:', errors.array());
    return res.status(400).json({
      success: false,
      message: 'Input validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  console.log('✅ Input validation passed');
  next();
};

// Validation rules for creating an order
const validateCreateOrder = [
  // Customer validation
  body('customer.name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/)
    .withMessage('Name can only contain letters (English/Hebrew) and spaces'),

  body('customer.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('customer.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10, max: 200 })
    .withMessage('Address must be between 10 and 200 characters'),
  // Products validation
  body('products')
    .isArray({ min: 1 })
    .withMessage('At least one product is required'),
  
  body('products.*.productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Product ID must be between 1 and 50 characters'),
  
  body('products.*.productName')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  
  body('products.*.categoryId')
    .notEmpty()
    .withMessage('Category ID is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Category ID must be between 1 and 50 characters'),
  
  body('products.*.categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  
  body('products.*.quantity')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Quantity must be a positive integer between 1 and 1000'),
  
  body('products.*.unitPrice')
    .isFloat({ min: 0.01, max: 100000 })
    .withMessage('Unit price must be a positive number between 0.01 and 100000'),
  
  handleValidationErrors
];

module.exports = {
  validateCreateOrder,
  handleValidationErrors
};