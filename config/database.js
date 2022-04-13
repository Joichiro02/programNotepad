const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect("mongodb://localhost/notepad");
    const conn = await mongoose.connect(process.env.MONGODB);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Connection error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
