// Pre-save middleware - runs before saving to database

const preSaveMiddleware = function(next) {
  try {
    console.log('🔄 Processing order before save...');
    
    // Ensure products array exists
    if (!this.products || this.products.length === 0) {
      return next(new Error('At least one product is required'));
    }

    // Calculate total price for each product
    this.products.forEach((product, index) => {
      if (!product.totalPrice || product.totalPrice === 0) {
        product.calculateTotal();
        console.log(`💰 Calculated total for ${product.productName}: $${product.totalPrice}`);
      }
    });
    
    // Calculate order summary
    if (!this.orderSummary) {
      this.orderSummary = {};
    }
    
    this.orderSummary.calculateTotals(this.products);
    console.log(`📊 Order summary: ${this.orderSummary.totalItems} items, $${this.orderSummary.totalAmount} total`);
    
    next();
  } catch (error) {
    console.error('❌ Error in pre-save middleware:', error.message);
    next(error);
  }
};

// Pre-validate middleware - runs before validation
const preValidateMiddleware = function(next) {
  try {
    console.log('✅ Validating order data...');
    
    // Validate customer data
    if (this.customer) {
      const customerErrors = this.customer.validateData();
      if (customerErrors.length > 0) {
        console.error('❌ Customer validation failed:', customerErrors);
        return next(new Error(`Customer validation failed: ${customerErrors.join(', ')}`));
      }
      console.log('✅ Customer data is valid');
    }
    
    // Validate products data
    if (this.products && this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        const productErrors = this.products[i].validateData();
        if (productErrors.length > 0) {
          console.error(`❌ Product ${i + 1} validation failed:`, productErrors);
          return next(new Error(`Product ${i + 1} validation failed: ${productErrors.join(', ')}`));
        }
      }
      console.log(`✅ All ${this.products.length} products are valid`);
    }
    
    // Validate order summary
    if (this.orderSummary && this.products) {
      const summaryErrors = this.orderSummary.validateSummary(this.products);
      if (summaryErrors.length > 0) {
        console.error('❌ Order summary validation failed:', summaryErrors);
        return next(new Error(`Order summary validation failed: ${summaryErrors.join(', ')}`));
      }
      console.log('✅ Order summary is valid');
    }
    
    console.log('✅ All validations passed');
    next();
  } catch (error) {
    console.error('❌ Error in validation middleware:', error.message);
    next(error);
  }
};

// Post-save middleware - runs after saving
const postSaveMiddleware = function(doc, next) {
  try {
    console.log(`✅ Order ${doc.orderId} saved successfully to database`);
    console.log(`📧 Customer email: ${doc.customer.email}`);
    console.log(`💰 Total amount: $${doc.orderSummary.totalAmount}`);   
    
    next();
  } catch (error) {
    console.error('❌ Error in post-save middleware:', error.message);
    next(error);
  }
};

// Error handling middleware
const errorMiddleware = function(error, doc, next) {
  console.error('❌ Order processing error:', error.message);
  
  // Add custom error handling logic here
  if (error.name === 'ValidationError') {
    console.error('📝 Validation errors:', Object.keys(error.errors));
  }
  
  next(error);
};

// Function to apply all middleware to schema
const applyMiddleware = (schema) => {
  schema.pre('save', preSaveMiddleware);
  schema.pre('validate', preValidateMiddleware);
  schema.post('save', postSaveMiddleware);
  schema.post('save', errorMiddleware);
  
  console.log('✅ Order middleware applied to schema');
};

module.exports = {
  preSaveMiddleware,
  preValidateMiddleware,
  postSaveMiddleware,
  errorMiddleware,
  applyMiddleware
};