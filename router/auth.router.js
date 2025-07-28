const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");
const rateLimiter = require("../middleware/rate-limiter");

const { register, login, logout } = require("../controllers/auth.controllers");

router.post("/register", rateLimiter, register);
router.post("/login", rateLimiter, login);
router.post("/logout", authenticate, logout);

module.exports = router;
