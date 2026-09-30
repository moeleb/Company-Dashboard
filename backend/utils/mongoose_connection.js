const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mkanafani:mkanafani@cluster0.bhxsucd.mongodb.net/internal_dashboard?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;