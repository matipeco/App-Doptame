const { Router } = require("express");
const apaRouter = require("./apaRouter");
const petRouter = require("./petRouter");
const userRouter = require("./userRouter");
const favRouter = require("./FavRouter");
const routerAuth = require("./authRouter");
const LoginRouter = require("./LoginRouter");
const mainRouter = Router();

mainRouter.use("/apa", apaRouter);
mainRouter.use("/pets", petRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/favorites", favRouter);
mainRouter.use("/api/auth/users", routerAuth);
mainRouter.use("/auth/apas", routerAuth);
mainRouter.use("/auth/apa/user", LoginRouter);

module.exports = mainRouter;
