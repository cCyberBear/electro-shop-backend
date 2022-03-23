const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");
const { jwtAuth } = require("../middlewares/jwtAuth");

router.post("/create", PRODUCT.createProduct);

module.exports = router;
