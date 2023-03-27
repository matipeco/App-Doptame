const express = require("express");

const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mainRouter = require("../routes");
const fileUpload = require("express-fileupload");
//middlewares
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(mainRouter);

module.exports = app;
