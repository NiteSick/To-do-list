require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const todoRotuer = require("./routes/todos");
const registerRotuer = require("./routes/register");
const authRotuer = require("./routes/auth");
const refreshRotuer = require("./routes/refresh");
const verifyJWT = require("./middlewares/verifyJwt");

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/register", registerRotuer);
app.use("/api/auth", authRotuer);
app.use("/api/refresh", refreshRotuer);

app.use(verifyJWT);
app.use("/api/todos", todoRotuer);

app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
