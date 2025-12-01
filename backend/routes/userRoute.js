const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
const passport = require("passport");

router.post("/register", userControllers.registerUser);
router.get("/register", userControllers.getsignUp);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
  }),
  userControllers.loginUser
);
router.post("/admin", userControllers.adminLogin);

module.exports = router;
