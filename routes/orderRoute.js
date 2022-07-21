const express = require("express");
const router = express.Router();
const ORDER = require("../controllers/orderController");
const { jwtAuth } = require("../middlewares/jwtAuth");

router.post("/create", jwtAuth, ORDER.createOrder);
router.get("/all-order", ORDER.getAllOrder);
router.get("/user-order", jwtAuth, ORDER.userGetThierOrder);
router.get("/get-top", ORDER.getTop);

module.exports = router;
