const express = require("express");

const mongoose = require("mongoose");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Disconnected from MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
