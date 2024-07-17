const express = require("express");
const Storycontroller = require("./controllers/story.controller");
const cors = require("cors");
const connect = require("./configs/db");
const port = process.env.PORT || 3333;
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, async () => {
  console.log("listening on port " + port);
  try {
    await connect();
    console.log("db connection established!");
  } catch (err) {
    console.log("db connection failed", err.message);
  }
});

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, world!" });
});

app.use("/stories", Storycontroller);
