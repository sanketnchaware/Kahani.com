const mongoose = require("mongoose");

const UserSchema = new mongoose.Schmea({
  id: { required: true },
  firstName: {
    type: String,
    required: true,
  },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
});

const User = mongoose.modelNames("user", UserSchema);
module.exports = User;
