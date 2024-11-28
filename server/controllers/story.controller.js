const express = require("express");
const Story = require("../modals/story.model.js");
const router = express.Router();

async function generateCustomId() {
  const latestStory = await Story.findOne().sort({ id: -1 });
  const latestId = latestStory ? latestStory.id : 0;
  return latestId + 1;
}

// get story list
router.get("", async (req, res) => {
  try {
    const stories = await Story.find().lean().exec();
    return res.status(201).send({ stories: stories, message: "Stories List" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// create story
router.post("/create", async (req, res) => {
  try {
    const { title, tags, description } = req.body;

    const customid = await generateCustomId();

    // newStory create intance of  story Model

    const newStory = new Story({
      title: title,
      description: description,
      tags: tags,
      id: customid,
    });
    // newStory.save() is used to do manipulation and the document
    // when save is called Mongoose sends an insert operation to MongoDB, which creates a new document.
    // create is use to directly create new document into the story

    const savedStory = await newStory.save();

    return res.status(200).send({
      data: savedStory,
      message: "Story created successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
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
