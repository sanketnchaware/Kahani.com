const express = require("express");
const Story = require("../modals/Story.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().lean().exec();
    return res.status(201).send({ stories: stories, message: "Stories List" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createdStory = await Story.create(req.body);
    return res.send({
      data: createdStory,
      message: "Story created successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
module.exports = router;
