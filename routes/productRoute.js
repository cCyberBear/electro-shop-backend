const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");

router.post("/create", PRODUCT.createProduct);

module.exports = router;
