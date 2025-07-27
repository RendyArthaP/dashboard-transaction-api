const authService = require("../services/auth.services");

const register = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    const user = await authService.register(name, email, password, roles);
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
    const { user, token } = await authService.login(email, password);
    res.status(200).json({
      message: "Login success",
      data: user,
      token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
