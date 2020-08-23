// Routes for user authentication

const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");

// Sign Up Logic
router.post("/signup", function (req, res) {
  // Check if input fields are valid
  if (!req.body.username || !validateEmail(req.body.username)) {
    res.status(406).json({
      status: 406,
      message: "Please provide a valid email address.",
    });
  } else if (!req.body.name || req.body.name.length < 3) {
    res.status(406).json({
      status: 406,
      message: "Please provide a name of at least 3 characters.",
    });
  } else if (!req.body.password || req.body.password.length < 5) {
    res.status(406).json({
      status: 406,
      message: "Please provide a password of at least 5 characters.",
    });
  }

  let newUser = new User({
    username: req.body.username,
    name: req.body.name,
  });

  // Register the user
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

// Log In Logic
router.post("/login", passport.authenticate("local"), function (req, res) {
  if (!req.user) {
    return res.send({ status: 422, message: "signupfailed" });
  }
  res.status(200).json({
    status: 200,
    username: req.user.username,
    name: req.user.name,
    id: req.user.id,
  });
});

// Log Out Logic
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: 200, message: "Successfully logged out." });
});

// Check if provided email is in the proper format
function validateEmail(email) {
  const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
}

module.exports = router;
