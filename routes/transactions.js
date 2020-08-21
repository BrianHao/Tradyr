// Routes for user transactions

const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const passport = require("../middleware/auth");

// Get user's list of transactions
router.get("/", passport.isLoggedIn(), function (req, res) {
  User.findById(req.user.id)
    .populate("transactions")
    .then((user) =>
      res.status(200).json({ status: 200, transactions: user.transactions })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, message: "Unable to get user's transactions." })
    );
});

module.exports = router;
