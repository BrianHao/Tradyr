// Stock Model
const mongoose = require("mongoose");

// SCHEMA SETUP
const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Stock", StockSchema);
