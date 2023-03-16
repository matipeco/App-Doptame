const { Router } = require("express");
const apaRouter = require("./apaRouter");
const petRouter = require("./petRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/pets", petRouter);

module.exports = mainRouter;
