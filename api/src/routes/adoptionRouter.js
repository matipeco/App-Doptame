const { Router } = require("express");
const adoptPet = require("../controllers/adoptionInProcess");
const adoptProgressRouter = Router();

adoptProgressRouter.post("/adopt", adoptPet);

module.exports = adoptProgressRouter;
