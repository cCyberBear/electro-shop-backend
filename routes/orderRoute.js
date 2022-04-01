const express = require("express");
const router = express.Router();
const ORDER = require("../controllers/orderController");

router.post("/create", ORDER.createOrder);
router.get("/all-order", ORDER.getAllOrder);

module.exports = router;
