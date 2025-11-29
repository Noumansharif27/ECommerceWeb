const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");

router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.post("/admin", userControllers.adminLogin);

module.exports = router;
