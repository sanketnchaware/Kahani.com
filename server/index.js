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

// Define the allowed origin(s) (use "*" for any origin or specify the frontend URL)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Allow only the frontend URL or a list of URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Use the CORS middleware with the configuration

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
