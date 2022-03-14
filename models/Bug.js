const mongoose = require("mongoose");

function nameLengthValidator(val) {
  return val.length <= 20 && val.length >= 2;
}

function descriptionLengthValidator(val) {
  return val.length <= 200;
}

const BugSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.ObjectId,
    required: [true, "Bugs must be associated with projects"],
  },
  name: {
    type: String,
    trim: true, // Trims the white space :)
    required: [true, "Please give your bug a name"],
    validator: nameLengthValidator,
    msg: "Please keep your bug name between 1 and 21 characters",
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please describe the bug"],
    validator: descriptionLengthValidator,
    msg: "Please keep your bug description less than or equal to 200 characters",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  labels: {
    type: Array,
  },
  status: {
    type: String,
    trim: true, // not sure about what this will be yet
  },
});

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;
