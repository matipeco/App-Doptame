const { Router } = require("express");
const apaRouter = require("./apaRouter");
const userRouter = require("./userRouter");
const petRouter = require("./petRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/pets", petRouter);

module.exports = mainRouter;
