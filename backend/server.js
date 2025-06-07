require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const todoRotuer = require("./routes/todos");
const registerRotuer = require("./routes/register");
const authRotuer = require("./routes/auth");
const refreshRotuer = require("./routes/refresh");
const logoutRouter = require("./routes/logout");
const userRouter = require("./routes/users");
const verifyJWT = require("./middlewares/verifyJwt");
const connectDB = require("./config/connnectDb");

const app = express();

// connnect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/register", registerRotuer);
app.use("/api/auth", authRotuer);
app.use("/api/refresh", refreshRotuer);
app.use("/api/logout", logoutRouter);

app.use(verifyJWT);
app.use("/api/todos", todoRotuer);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running at port: ", process.env.PORT);
});
