const db = require("../config/db");

const getUserByEmail = async (email) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

const getUserById = async (id) => {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

const getUserByName = async (name) => {
  const res = await db.query("SELECT * FROM users WHERE name = $1", [name]);
  return res.rows[0];
};

const getUserByRole = async (role) => {
  const res = await db.query("SELECT * FROM users WHERE roles = $1", [role]);
  return res.rows[0];
};

const createUser = async (name, email, hashedPassword, roles) => {
  const res = await db.query(
    "INSERT INTO users (name, email, password, roles) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, roles]
  );
  return res.rows[0];
};

module.exports = {
  getUserByEmail,
  getUserByRole,
  getUserById,
  getUserByName,
  createUser,
};
