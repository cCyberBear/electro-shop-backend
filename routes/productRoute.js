const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");
const upload = require("../middlewares/upload");

router.post("/create", upload.single("product"), PRODUCT.createProduct);

module.exports = router;
