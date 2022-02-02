const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: Buffer,
    required: true,
  },
  salt: {
    type: Buffer,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
