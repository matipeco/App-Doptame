const petRouter = require('express').Router();
const petSchema = require('../models/Pet');
const Pet= require('../models/Pet');
const {getAllPets,getPetById,createPet,editPet,deletePet} = require('../controllers/petController');

petRouter.get("/",getAllPets)
petRouter.get('/:petId',getPetById)
petRouter.post('/create/:apaId',createPet) // Diego: Agregamos params a la ruta para que tenga en cuenta la id de la Apa desde donde se crea la mascota
petRouter.put('/edit/:petId',editPet);
petRouter.delete('/delete/:petId',deletePet)

module.exports = petRouter;