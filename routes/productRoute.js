const express = require("express");
const router = express.Router();
const PRODUCT = require("../controllers/productController");
const upload = require("../middlewares/upload");

router.post("/create", upload.single("product"), PRODUCT.createProduct);
router.get("/all-product", PRODUCT.getAll);

module.exports = router;
