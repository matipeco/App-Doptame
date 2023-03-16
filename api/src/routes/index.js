const { Router } = require("express");
const apaRouter = require("./apaRouter");
const userRouter = require("./userRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter;
