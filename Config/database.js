// Import All Dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const connectionString = process.env.DATABASE_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Connection Established !`.rainbow);
  } catch (err) {
    console.log(`Connection Not Established...! ${err}`.bgRed.bold.white);
  }
};

module.exports = connectDB;
