const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config({
  path: "./config/.env",
});

connectDB();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "Random Text",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes/routes");

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}...`
      .cyan.bold
  );
});
