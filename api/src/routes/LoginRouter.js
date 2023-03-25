const { Router } = require("express");
const routerLogin = Router();

const Login = require("../controllers/LoginController");

routerLogin.post("/login", Login);

module.exports = routerLogin;
