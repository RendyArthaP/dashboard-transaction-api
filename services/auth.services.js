const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

const handleRegister = async (name, email, password, roles = "user") => {
  const existingUser = await userModel.getUserByEmail(email);
  const validRoles = ["user", "admin", "owner"];

  if (existingUser) throw new Error("User already exists");

  if (roles === "owner") {
    const ownerExists = await userModel.getUserByRole("owner");
    if (ownerExists) throw new Error("Owner already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const safeRole = validRoles.includes(roles) ? roles : "user";

  const user = await userModel.createUser(
    name,
    email,
    hashedPassword,
    safeRole
  );
  return user;
};

const handleLogin = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!user && !isMatch) throw new Error("Invalid credentials");

  const payload = {
    name: user.name,
    roles: user.roles,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1d",
  });

  return { token };
};

module.exports = {
  handleRegister,
  handleLogin,
};
