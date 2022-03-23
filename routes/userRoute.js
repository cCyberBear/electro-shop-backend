const express = require("express");
const router = express.Router();
const USER = require("../controllers/userController");
const { jwtAuth } = require("../middlewares/jwtAuth");

router.post("/register", USER.register);
router.post("/login", USER.login);
router.patch("/change-password", jwtAuth, USER.changePassword);

module.exports = router;
