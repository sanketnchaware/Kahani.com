const express = require("express");
const Storycontroller = require("./controllers/story.controller");
const UserController = require("./controllers/user.controller");
const passport = require("./configs/passport");
const cors = require("cors");
const connect = require("./configs/db");
const app = express();
const port = process.env.PORT || 3333;
const session = require("express-session");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    saveInitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

// Basic route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
});

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
    // Successful authentication, redirect home.
    // res.redirect("/");
    // return res.status(200).send({
    //   message: "Authentication successful",
    //   user: req.user,
    //   token: "dsfdaf510w21dsf6as59q1ad",
    // });
    return res.status(200).send({
      message: "Authentication successful",
      token: "dsfdaf510w21dsf6as59q1ad",
    });
  }
);

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
app.use("/users", UserController);
