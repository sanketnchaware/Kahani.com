const express = require("express");
const Story = require("../modals/story.model.js");
const router = express.Router();

async function generateCustomId() {
  const latestStory = await Story.findOne().sort({ id: -1 });
  const latestId = latestStory ? latestStory.id : 0;
  return latestId + 1;
}

// get story list
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().lean().exec();
    return res.status(201).send({ stories: stories, message: "Stories List" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// create story
// POST route to create a new story
router.post("/", async (req, res) => {
  try {
    const { title, tags, description } = req.body;

    // Validate input
    if (!title || !description || !tags) {
      return res.status(400).send({
        message: "All fields (title, description, tags) are required",
      });
    }

    // Generate a custom ID for the new story
    const customid = await generateCustomId();

    // Create a new story document
    const newStory = new Story({
      title: title,
      description: description,
      tags: tags,
      id: customid,
    });

    // Save the story to the database
    const savedStory = await newStory.save();

    // Respond with the saved story
    return res.status(200).send({
      data: savedStory,
      message: "Story created successfully",
    });
  } catch (err) {
    // Handle different error types if necessary
    console.error(err);
    return res
      .status(500)
      .send({ message: "An error occurred while creating the story" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Story.findOne({ id: req.params.id }).lean().exec();
    if (!item) {
      return res.status(404).send({ message: "not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "story found successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Story.findOneAndDelete({ id: req.params.id })
      .lean()
      .exec();
    if (!item) {
      return res.status(404).send({ message: "not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "story deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const item = await Story.findOneAndUpdate(
      { id: req.params.id },
      {
        title,
        description,
        tags,
      },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: "not found" });
    }
    return res.status(200).send({ story: item, message: "Story Updated" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
