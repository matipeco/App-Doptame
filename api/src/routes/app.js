const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mainRouter = require("../routes");
const createrRole = require("../libs/initialSetup");
const createAdmins = require("../libs/initialSetupAdmin");
const Stripe = require ('stripe');

const stripe = new Stripe('sk_test_51Ms5HqGfi9BkoSkaRxF6Uyu8j7AgzClbAwE98PyXXivPAeTHKjNOVkbEOEJzFe8HsQtHYxzsuymMGjsldX7wh4AS00VSYb0i3I')

//middlewares
createrRole();
createAdmins();

app.use(morgan("dev"));
// app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(mainRouter);

module.exports = app;
