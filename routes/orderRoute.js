const express = require("express");
const router = express.Router();
const ORDER = require("../controllers/orderController");
const { jwtAuth } = require("../middlewares/jwtAuth");

router.post("/create", jwtAuth, ORDER.createOrder);
router.get("/all-order", ORDER.getAllOrder);
router.get("/user-order", jwtAuth, ORDER.userGetThierOrder);

module.exports = router;
