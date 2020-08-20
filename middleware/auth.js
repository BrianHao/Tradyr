const passport = require("passport");

// Check if user is logged in
passport.isLoggedIn = () => (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = passport;
