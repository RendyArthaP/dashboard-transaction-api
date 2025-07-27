const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

const register = async (name, email, password, roles = "user") => {
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

const login = async (email, password) => {
  const user = await userModel.getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!user) throw new Error("Invalid credentials");

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
