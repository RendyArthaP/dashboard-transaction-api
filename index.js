const express = require("express");
const { PORT } = require("./config");
const cors = require("cors");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
