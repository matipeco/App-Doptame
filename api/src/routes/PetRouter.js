const petRouter = require('express').Router();
const petSchema = require('../models/Pet');
const Pet= require('../models/Pet');
const {getAllPets,getPetById,createPet,editPet,deletePet} = require('../controllers/petController');

petRouter.get("/",getAllPets)
petRouter.get('/:petId',getPetById)
petRouter.post('/create',createPet)
petRouter.put('/edit/:petId',editPet);
petRouter.delete('/delete/:petId',deletePet)

module.exports = petRouter;