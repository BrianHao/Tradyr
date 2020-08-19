// Stock Model
const mongoose = require("mongoose");

// SCHEMA SETUP
let StockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Stock", StockSchema);
