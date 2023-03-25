const { Router } = require("express");
const routerAuth = Router();

const authController = require("../controllers/authController");

routerAuth.post("/signIn", authController.signIn);
routerAuth.post("/signUp", authController.signUp);
module.exports = routerAuth;
