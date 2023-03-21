const userLoginRouter = require('express').Router();
const {userLogin} = require("../handlers/userLoginHandler"); 

userLoginRouter.post('/', userLogin);

  
  module.exports = userLoginRouter;