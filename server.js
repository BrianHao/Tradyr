// server.js

// Import Packages
const express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  expressSession = require("express-session"),
  MongoDBStore = require("connect-mongodb-session")(expressSession),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  cookieParser = require("cookie-parser"),
  dotenv = require("dotenv").config(),
  path = require("path");

const User = require("./models/user");

// Import Routes
const authRoutes = require("./routes/auth"),
  userRoutes = require("./routes/user"),
  stocksRoutes = require("./routes/stocks"),
  transactionsRoutes = require("./routes/transactions");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET || "chancroid astrionics";

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// App config
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Passport config
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});
store.on("error", function (error) {
  console.log(error);
});

app.use(
  expressSession({
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set current user
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/user/", userRoutes);
app.use("/user/:user/transactions", transactionsRoutes);
app.use("/user/:user", stocksRoutes);

app.get("/", (req, res) => {
  res.send("Hello from MERN testing 1");
});

// Bootstrap server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
