// Routes for user transactions

const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const passport = require("../middleware/auth");

// Get user's list of transactions
router.get("/", passport.isLoggedIn(), function (req, res) {
  User.findById(req.user.id)
    .populate("transactions")
    .then((user) => res.json(user.transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
