const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/database'); // Database connection function

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
console.log('🚀 Starting server...');
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: '🛒 Order Management API is running successfully!',
    status: 'Server Running',
    database: 'Connected to MongoDB',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🎉 Server is running successfully!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('📝 Test in browser or with curl');
});

module.exports = app;