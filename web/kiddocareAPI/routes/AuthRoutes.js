const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController")

// Route đăng ký
router.post("/register", authController.register);

// Route đăng nhập
router.post("/login", authController.login);

// Route đổi mật khẩu
router.post("/change-password", authController.changePassword);

module.exports = router;
