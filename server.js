const express = require("express");

const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config({
  path: "./config/config.env",
});

connectDB();

const app = express();

app.use(express.json());

const routes = require("./routes/routes");

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}...`
      .cyan.bold
  );
});
