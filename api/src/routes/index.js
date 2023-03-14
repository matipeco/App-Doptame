const { Router } = require("express");
const apaRouter = require("./apaRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);

module.exports = mainRouter;
