const { Project, Bug } = require("../models/Project");

exports.getProjects = async (req, res, next) => {
  try {
  } catch (err) {}
  res.send("GET request");
};

exports.addTransaction = (req, res, next) => {
  res.send("POST request");
};

exports.deleteTransaction = (req, res, next) => {
  res.send("DELETE request");
};
