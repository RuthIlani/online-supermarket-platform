const { Order } = require('../models/order');

// Create new order
const createOrder = async (req, res) => {
  try {
    console.log('📝 Starting order creation...');
    console.log('📦 Received data:', JSON.stringify(req.body, null, 2));
    
    const { customer, products } = req.body;

    // Create new order (validation and calculations happen in middleware)
    const newOrder = new Order({
      customer,
      products
    });
    
    console.log('💾 Saving order to database...');
    
    // Save order (this will trigger pre-save and pre-validate middleware)
    const savedOrder = await newOrder.save();
    
    console.log('✅ Order saved successfully!');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: savedOrder.orderId,
        customerName: savedOrder.customer.fullName,
        customerEmail: savedOrder.customer.email,
        totalItems: savedOrder.orderSummary.totalItems,
        totalAmount: savedOrder.orderSummary.totalAmount,
        orderDate: savedOrder.orderDate
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating order:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Order validation failed',
        errors: validationErrors
      });
    }
    
    // Handle duplicate orderId error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Order ID already exists. Please try again.',
        error: 'Duplicate order ID'
      });
    }
    
    // Handle general errors
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const createTestOrder = async (req, res) => {
  try {
    console.log('🧪 Creating test order...');
    
    const testOrderData = {
      customer: {
        name: 'John Doe',
        email: `test.${Date.now()}@example.com`,
        address: '123 Test Street, Test City, TC 12345'
      },
      products: [
        {
          productId: 'P001',
          productName: 'iPhone 15 Pro',
          categoryId: 'C001',
          categoryName: 'Electronics',
          quantity: 1,
          unitPrice: 999.99
        },
        {
          productId: 'P002',
          productName: 'AirPods Pro',
          categoryId: 'C002',
          categoryName: 'Accessories',
          quantity: 2,
          unitPrice: 249.99
        }
      ],
      orderSummary: {
        totalItems: 3,        // 1 iPhone + 2 AirPods = 3 items
        totalAmount: 1499.97  // 999.99 + (2 * 249.99) = 1499.97
      }
    };
    
    const testOrder = new Order(testOrderData);
    const savedOrder = await testOrder.save();
    
    console.log('✅ Test order created successfully:', savedOrder.orderId);
    
    res.status(201).json({
      success: true,
      message: 'Test order created successfully',
      data: savedOrder.getSummary()
    });
    
  } catch (error) {
    console.error('❌ Error creating test order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create test order',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  createTestOrder
};