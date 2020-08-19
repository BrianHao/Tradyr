// Transaction Model
const mongoose = require("mongoose");

// SCHEMA SETUP
let TransactionSchema = new mongoose.Schema({
  ticker: {
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
    required: true,
    default: Date.now,
  },
  isBuy: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
