const express = require("express");
const router = express.Router();
const authRouter = require("./auth.router");

router.get("/", (req, res) => {
  res.json({ status: 200, message: "Connected!" });
});

router.use("/auth", authRouter);

module.exports = router;
