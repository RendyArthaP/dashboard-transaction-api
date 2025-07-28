const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../services/auth.services");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const blacklisted = await isTokenBlacklisted(token);

  if (!authHeader) return res.status(401).json({ message: "No token" });

  if (blacklisted)
    return res.status(403).json({ message: "Token expired or blacklisted" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
