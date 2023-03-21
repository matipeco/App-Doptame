const apaLoginRouter = require('express').Router();
const {apaLogin} = require("../handlers/apaLoginHandler"); 

apaLoginRouter.post('/', apaLogin)
  
  module.exports = apaLoginRouter;