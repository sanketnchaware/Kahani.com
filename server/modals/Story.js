const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const storySchema = new mongoose.Schema(
  {
    story: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      tags: [{ type: String, requiredL: true }],
    },
  },
  { versionKey: false },
  { timeStamps: true }
);

const Story = mongoose.model("story", storySchema);

module.exports = Story;
