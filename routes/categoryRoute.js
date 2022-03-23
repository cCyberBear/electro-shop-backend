const express = require("express");
const router = express.Router();
const CATEGORY = require("../controllers/categoryController");

router.post("/create", CATEGORY.create);
router.get("/all-category", CATEGORY.getAll);

router.post("/sub-category/create", CATEGORY.createSub);
router.get("/sub-category/all-sub", CATEGORY.getAllSub);

module.exports = router;
