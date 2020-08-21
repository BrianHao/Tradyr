// Routes for user authentication

const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/auth");

// Sign Up
router.post("/signup", function (req, res) {
  let newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });

  if (!validateEmail(req.body.username)) {
    res.status(406).json({
      status: 406,
      message: "Please provide a valid email address.",
    });
  }

  if (req.body.name.length < 3) {
    res.status(406).json({
      status: 406,
      message: "Please provide a name of at least 3 characters.",
    });
  }

  if (req.body.password.length < 5) {
    res.status(406).json({
      status: 406,
      message: "Please provide a password of at least 5 characters.",
    });
  }

  User.register(newUser, req.body.password)
    .then((err, user) => {
      //passport.authenticate("local");
      return res.status(200).json({
        status: 200,
        message: "Successfully signed up as " + req.body.username,
      });
    })
    .catch((err) =>
      res.status(422).json({
        status: 422,
        message: "A user already exists with the provided email address.",
      })
    );
});

// Log In
router.post("/login", passport.authenticate("local"), function (req, res) {
  console.log(req.user);
  res.status(200).json({
    status: 200,
    username: req.user.username,
    name: req.user.name,
    id: req.user.id,
  });
});

// Log Out
router.get("/logout", middleware.isLoggedIn(), (req, res) => {
  req.logout();
  res.status(200).json({ status: 200, message: "Successfully logged out." });
});

function validateEmail(email) {
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}

module.exports = router;
