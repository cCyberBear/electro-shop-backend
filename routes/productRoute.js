const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");
const mongoUpload = require("../middlewares/uploadMongo");

router.post("/create", mongoUpload.single("image"), PRODUCT.createProduct);
router.get("/all-product", PRODUCT.getAll);

module.exports = router;
