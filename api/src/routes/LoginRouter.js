const { Router } = require("express");
const routerLogin = Router();

const ctrlLogin = require("../controllers/LoginController");

routerLogin.post("/login", ctrlLogin.Login);
routerLogin.post("/loginGoogle", ctrlLogin.LoginWithGoogle);

module.exports = routerLogin;
