const User = require("../models/user.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login User
module.exports.loginUser = async (req, res) => {};

// Register User
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //   check user already exists or not
    const exists = await User.find({ email });
    if (exists) {
      return res, json({ succes: false, message: "User already exists!" });
    }

    //   Validate email format and strong password
    if (!validate.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    if (password.length > 0) {
      res.json({ success: false, message: "Please enter a strong password!" });
    }

    //   Hashing user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = newUser.save();
    const token = createToken(user._id);

    res, json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error });
  }
};

// Admin Login
module.exports.adminLogin = async (req, res) => {};
