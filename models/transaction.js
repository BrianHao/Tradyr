// Transaction Model
const mongoose = require("mongoose");

// SCHEMA SETUP
const TransactionSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  isBuy: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
