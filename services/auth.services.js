const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

const register = async (name, email, password, role = "user") => {
  const existingUser = await userModel.getUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const validRoles = ["user", "admin", "owner"];

  if (role === "owner") {
    const ownerExists = await userModel.findUserByRole("owner");
    if (ownerExists) throw new Error("Owner already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const safeRole = validRoles.includes(role) ? role : "user";

  const user = await userModel.createUser(
    name,
    email,
    hashedPassword,
    safeRole
  );
  return user;
};

const login = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { user, token };
};

module.exports = {
  register,
  login,
};
