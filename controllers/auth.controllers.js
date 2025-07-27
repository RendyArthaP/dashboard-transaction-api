const authService = require("../services/auth.services");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await authService.register(name, email, password, role);
    res.status(200).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ message: "Login success", user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
  register,
  login,
};
