const express = require("express");
const Storycontroller = require("./controllers/story.controller");
const UserController = require("./controllers/user.controller");
const passport = require("./configs/passport");
const cors = require("cors");
const connect = require("./configs/db");
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware setup
app.use(express.json());

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = "*";
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

// Session configuration
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

// Basic route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
});

// Google authentication routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Assuming you're generating a token for the user
    const token = "dsfdaf510w21dsf6as59q1ad";

    // Redirect the user to your frontend (make sure this is the correct frontend URL)
    res.redirect(`http://localhost:3000?token=${token}`); // Use a query parameter or another method to send the token
  }
);

// Use controllers for stories and users
app.use("/stories", Storycontroller);
app.use("/users", UserController);

// Catch-all for undefined routes (should be at the end of your route definitions)
app.all("*", (req, res) => {
  return res.status(404).send({ message: "Route not found" });
});

// Connect to the database and start the server
app.listen(port, async () => {
  console.log("Listening on port " + port);
  try {
    await connect(); // Ensure this connects to your database
    console.log("DB connection established!");
  } catch (err) {
    console.log("DB connection failed", err.message);
  }
});
