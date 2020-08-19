const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/auth");

// Get user's list of transactions
router.get("/", middleware.loggedIn(), function (req, res) {
  User.findById(req.user.id)
    .then((user) => res.json(user.transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
