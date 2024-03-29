const express = require("express");
const router = express.Router();

const passport = require("../config/passport");

const {
  getProjects,
  addProject,
  deleteProject,
} = require("../controllers/bugTrackerController");

const {
  getCurrentUser,
  checkIfAlreadyRegistered,
  registerUser,
  login,
  logout,
} = require("../controllers/authController");

router
  .route("/register")
  .post(
    checkIfAlreadyRegistered,
    registerUser,
    passport.authenticate("local"),
    login,
    getCurrentUser
  );

router.route("/login").post(passport.authenticate("local"), login);

router.route("/logout").post(logout);

router.route("/checkuser").get(getCurrentUser);

router.route("/projects").get(getProjects).post(addProject);

router.route("/projects/:id").delete(deleteProject);

module.exports = router;
