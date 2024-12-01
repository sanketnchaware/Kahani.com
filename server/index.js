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

// Enable CORS with credentials support
app.use(
  cors({
    origin: "https://mykahani.netlify.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow sending cookies with cross-origin requests
  })
);

// Session middleware for cookies (Optional for user sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Use a session secret for security
    resave: false, // Do not resave session if it is not modified
    saveUninitialized: false, // Do not create a session until something is stored
    cookie: {
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Only set cookies over HTTPS in production
      sameSite: "None", // Allow cookies to be sent in cross-origin requests
      maxAge: 1000 * 60 * 60, // Cookie expiry in 1 hour
    },
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
    // Assuming the user has logged in successfully and you have a token
    const token = "dsfdaf510w21dsf6as59q1ad"; // This token should come from your authentication logic

    // Set a dynamic cookie (e.g., after a successful login)
    res.cookie("auth_token", token, {
      httpOnly: true, // Make sure it's not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Only set cookies over HTTPS in production
      sameSite: "None", // Allows cookies to be sent in cross-origin requests
      maxAge: 1000 * 60 * 60, // Cookie expires in 1 hour
    });

    // Redirect the user to the frontend after authentication
    res.redirect(`https://mykahani.netlify.app?token=${token}`);
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
