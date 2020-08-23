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
app.use(
  cors({
    methods: ["GET", "POST"],
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("client/build"));
//app.use(express.static(path.join(__dirname, "client", "build")));

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
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/transactions", transactionsRoutes);
app.use("/api/user/stocks/", stocksRoutes);

// Serve React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Bootstrap server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
