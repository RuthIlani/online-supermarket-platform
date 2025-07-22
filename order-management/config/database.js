// config/database.js - MongoDB database connection
const mongoose = require('mongoose');

// Function to connect to database
const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to database...');
    
    // Connect to MongoDB with settings
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB connected successfully!');
    console.log(`📍 Server address: ${conn.connection.host}`);
    console.log(`🗄️  Database name: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ Database connection error:');
    console.error(error.message);
    
    // Exit process if connection fails
    console.log('🔴 Stopping server due to database connection error');
    process.exit(1);
  }
};

// Database events
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Database error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from database');
});

module.exports = connectDB;