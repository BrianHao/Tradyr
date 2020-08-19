// User Model
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// SCHEMA SETUP
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    minlength: 5,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  cash: {
    type: Number,
    default: 500000,
  },
  stocksOwned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
