const User = require("../models/User");
const crypto = require("crypto");

// @desc checks if there is a user on this route.
// @route POST /api/v1/checkuser
// @access Private (?)
exports.getCurrentUser = (req, res) => {
  // checks if there is a user on this route.
  // if there is, return that user to the frontend for use.
  // req.user is given to us via passport session ?
  // console.log(`current user: ${req.user}`);

  if (req.user) {
    const { username, _id } = req.user;

    return res.status(200).json({
      success: true,
      data: { username: username, id: _id },
    });
  } else {
    res.status(401).json({ user: null });
  }
};

// @desc check if the user is already registered
// @route POST /api/v1/register
// @access Private (?)
exports.checkIfAlreadyRegistered = async (req, res, next) => {
  const { username } = req.body;
  const registered = await User.find({ username });
  if (registered[0] && registered[0]._id) {
    res.json({ error: `Sorry, already a user with the username: ${username}` });
    return;
  }
  next();
};

// @desc register a user
// @route POST /api/v1/register
// @access Private (?)
exports.registerUser = async (req, res, next) => {
  // need to encrypt password
  const { username, password } = req.body;
  const userSalt = crypto.randomBytes(16);

  crypto.pbkdf2(
    password,
    userSalt,
    310000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return;
      }
      await User.create({
        username: username,
        hashed_password: hashedPassword,
        salt: userSalt,
      });
      next();
    }
  );
};

// @desc login the user
// @route POST /api/v1/login
// @access Private (?)
exports.login = (req, res, next) => {
  console.log("Login Successful");
  req.login(req.user, (err) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    }
    const { username, _id } = req.user;

    return res.status(201).json({
      success: true,
      data: { username: username, id: _id },
    });
  });
};

// @desc logout the user
// @route POST /api/v1/login
// @access Private (?)
exports.logout = (req, res, next) => {
  console.log("Logout successful");
  req.logout(req.user);
  res.redirect("/");
};
