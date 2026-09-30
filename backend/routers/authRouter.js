const express = require('express');
const { login, register, getProfile, logout } = require("../controllers/authController.js");
const { authenticateToken } = require("../middlewares/auth.js");
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get("/me", authenticateToken, getProfile);

router.post("/logout", logout);

module.exports = router;
