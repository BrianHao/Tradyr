const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/auth");

// Sign Up
router.post("/signup", function (req, res) {
  let newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

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
  //res.status(200).json(req.user);
  res.redirect("/user/");
});

// Log Out
router.get("/logout", middleware.isLoggedIn(), (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
