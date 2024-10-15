const express = require("express");
const Storycontroller = require("./controllers/story.controller");
const cors = require("cors");
const connect = require("./configs/db");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

// Middleware for session handling
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Here you should fetch the user from the database
  done(null, { id }); // For now, just return the id
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you could save the user in your database if needed
      done(null, profile);
    }
  )
);

// Auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.redirect("http://localhost:3000"); // Redirect to React app
  }
);

app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }
      res.redirect("http://localhost:3000"); // Redirect to React app
    });
  });
});

// Basic route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
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

// Use the story controller
app.use("/stories", Storycontroller);
