const { Router } = require("express");
const apaRouter = Router();
const apaHandler = require("../handlers/apaHandler");

apaRouter.post("/", apaHandler);

module.exports = apaRouter;
