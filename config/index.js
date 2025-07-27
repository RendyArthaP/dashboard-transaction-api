const { PORT, JWT_KEY } = require("./environment");
const pool = require("./db");

module.exports = {
  PORT,
  pool,
  JWT_KEY,
};
