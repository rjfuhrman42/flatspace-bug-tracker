const mongoose = require("mongoose");

function nameLengthValidator(val) {
  return val.length <= 20 && val.length >= 2;
}

function descriptionLengthValidator(val) {
  return val.length <= 200;
}

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
  projects: [
    {
      name: {
        type: String,
        trim: true, // Trims the white space :)
        required: [true, "Please give your project a name"],
        validator: nameLengthValidator,
        msg: "Please keep your project name between 1 and 21 characters",
      },
      description: {
        type: String,
        trim: true,
        validator: descriptionLengthValidator,
        msg: "Please keep your project description less than or equal to 200 characters",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

      bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
    },
  ],
  // Array of Projects
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
