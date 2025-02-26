const express = require("express");
const todoRotuer = require("./routes/todos");

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the To-do-list API");
});
app.use("/api/todos", todoRotuer);

app.listen(PORT, () => {
  console.log("server is running at port: ", PORT);
});
