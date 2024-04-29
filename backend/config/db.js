const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/crypto");
    console.log(`MongoDB connected to ${conn.connection.host}`.cyan.underline);
  } catch {
    console.log("Error");
    process.exit(1);
  }
};

module.exports = connectDB;
