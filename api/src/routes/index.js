const { Router } = require("express");
const apaRouter = require("./apaRouter");
const petRouter = require("./petRouter");
const userRouter = require("./userRouter");
const userLoginRouter = require("./userLoginRouter");
// const apaLoginRouter = require("./apaLoginRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/pets", petRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/userLogin", userLoginRouter);
// mainRouter.use("/apaLogin", apaLoginRouter);

module.exports = mainRouter;
