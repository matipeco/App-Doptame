//const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;
const app = require("./src/routes/app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("conected to MongoDb"))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
