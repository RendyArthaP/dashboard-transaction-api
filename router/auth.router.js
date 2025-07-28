const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth.middleware");

const { register, login, logout } = require("../controllers/auth.controllers");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

module.exports = router;
