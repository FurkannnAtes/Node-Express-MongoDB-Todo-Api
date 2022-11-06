const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/databaseConnection");
const port = process.env.PORT || 5001;
const todoRouter = require("./src/routers/todoRouter");

app.use(express.json());

app.use("/api", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
