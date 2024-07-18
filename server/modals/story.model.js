const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const storySchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
  },

  { versionKey: false },
  { timeStamps: true }
);

const Story = mongoose.model("story", storySchema);

module.exports = Story;
