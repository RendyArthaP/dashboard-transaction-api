const authService = require("../services/auth.services");

const register = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    const user = await authService.handleRegister(name, email, password, roles);
    res.status(200).json({
      message: "User created",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.handleLogin(email, password);
    res.status(200).json({
      message: "Login success",
      data: user,
      token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Missing or malformed token" });
  }

  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  try {
    await authService.blacklistToken(token);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
