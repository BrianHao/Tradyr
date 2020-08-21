// Routes for user authentication

const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/auth");

// Sign Up
router.post("/signup", function (req, res) {
  let newUser = new User({
    email: req.body.email,
    name: req.body.name,
  });

  if (!validateEmail(req.body.email)) {
    throw new Error("Please provide a valid email address.");
  }

  User.register(newUser, req.body.password)
    .then((err, user) => {
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
      });
      return res
        .status(200)
        .json("Successfully signed up as " + req.body.username);
    })
    .catch((err) => res.status(422).json(err));
});

// Log In
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.redirect("/user/");
});

// Log Out
router.get("/logout", middleware.isLoggedIn(), (req, res) => {
  req.logout();
  res.sendStatus(200);
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = router;
