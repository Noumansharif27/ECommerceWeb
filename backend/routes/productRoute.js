const express = require("express");
const Product = require("../models/product.js");
const controllers = require("../controllers/productController.js");

const router = express.Router();

router.post("/add", controllers.addProduct);
router.post("/remove", controllers.removeProduct);
router.post("/single", controllers.singleProductInfo);
router.post("/list", controllers.listProduct);

module.exports = router;
