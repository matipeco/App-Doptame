const petRouter = require("express").Router();
const petSchema = require("../models/Pet");
const Pet = require("../models/Pet");
const {
  getAllPets,
  getPetById,
  createPet,
  editPet,
  deletePet,
} = require("../controllers/petController");
const { verifyToken, isApa, isAdmin } = require("../middlewares/authJwt");

petRouter.get("/", getAllPets);
petRouter.get("/:petId", getPetById);
petRouter.post("/create/:apaId", [verifyToken, isApa, isAdmin], createPet); // Diego: Agregamos params a la ruta para que tenga en cuenta la id de la Apa desde donde se crea la mascota
petRouter.put("/edit/:petId", [verifyToken, isApa, isAdmin], editPet);
petRouter.delete("/delete/:petId", [verifyToken, isApa, isAdmin], deletePet);

module.exports = petRouter;
