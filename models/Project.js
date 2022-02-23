const mongoose = require("mongoose");

function nameLengthValidator(val) {
  return val.length <= 20 && val.length >= 2;
}

function descriptionLengthValidator(val) {
  return val.length <= 200;
}

const BugSchema = new mongoose.Schema({
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

const ProjectSchema = new mongoose.Schema({
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
  /* 
   --------------------------------------------------------------------------------------
    Schema.Types.ObjectId, ref: "~collection reference name~" 
    =========================================================
    Allows us to use populate() later to populate the bugs associated with this project
    Those bugs are stored in a separate collection because bugs will be unbounded. 
    They contain a projectId, so that they can be populated to their respective projects
   --------------------------------------------------------------------------------------
   */
  bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
});

const Project = mongoose.model("Project", ProjectSchema);
const Bug = mongoose.model("Bug", BugSchema);

module.exports = { Project, Bug };
