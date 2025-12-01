const User = require("../models/user.js");
const validator = require("validator");
const asyncWrap = require("../asyncWrap.js");

// Login User
module.exports.loginUser = async (req, res) => {};

// Register User
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ username: name, email });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);

    req.login(registerUser, (err) => {
      if (err) {
        next(err);
      }

      res.redirect("/");
    });
  } catch (err) {
    console.log(`Error while registering User: ${err}`);
    res.redirect("/register");
  }
};

// Admin Login
module.exports.adminLogin = async (req, res) => {};
