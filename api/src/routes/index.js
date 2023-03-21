const { Router } = require("express");
const apaRouter = require("./apaRouter");
const petRouter = require("./petRouter");
const userRouter = require("./userRouter");
const favRouter = require("./FavRouter");

const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/pets", petRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/favorites", favRouter);

module.exports = mainRouter;
