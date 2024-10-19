const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: { type: Number },
    firstname: {
      type: String,
      required: true,
    },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true, // Combine the options into a single object
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
