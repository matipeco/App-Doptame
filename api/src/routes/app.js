const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mainRouter = require("../routes");
const createrRole = require("../libs/initialSetup");
const createAdmins = require("../libs/initialSetupAdmin");

//middlewares
createrRole();
createAdmins();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(mainRouter);

module.exports = app;
