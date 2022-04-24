const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");
const mongoUpload = require("../middlewares/uploadMongo");

router.post("/create", mongoUpload.single("image"), PRODUCT.createProduct);
router.post("/update/:id", mongoUpload.single("image"), PRODUCT.updateProduct);
router.delete("/delete/:id", PRODUCT.deleteProduct);
router.get("/all-product", PRODUCT.getAll);

module.exports = router;
