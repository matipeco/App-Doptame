
const petRouter = require('express').Router();
const Pet = require('../models/Pet');
const Apa = require('../models/Apa');
const {getPetWithLocation} = require('../controllers/petController');

//getAllPets
petRouter.get =('/', async (req,res)=>{
    try {
        const allPets= await Pet.find();
        res.status(200).json(allPets);
        
    } catch (error) {
        res.status(400).json({error: 'No se pudieron obtener todas las mascotas'})
    }
})



//getPetById
petRouter.get=('/:petId', async (req,res)=>{
    const {petId}=req.params;
    try {
        const pet=await Pet.findById(petId)
//Si encontró la Pet
        if (pet) {
//Bucar a qué APA pertenece
            const apa= await Apa.findById(pet.apa) //Agregué al Model Pet el atributo"apa", cuyo valor es el id de la APA.
//Si encontró la APA
            if (apa) {
                //Tomar su location y asignarla a la Pet
                const petWithLocation= getPetWithLocation(pet,apa);
                res.status(200).json(petWithLocation)
//Si no encontró la Apa
            } else {
                res.status(404).json({error: 'APA no encontrada'})
            }
        //Si no encontró la Pet
        } else{
            res.status(404).json({error: 'Mascota no encontrada'});
        }
    } catch (error) {
        res.status(404).json(error)
    }
})



//postPet
petRouter.post('/', async (req,res)=>{
    const {name,age,size,type,image,apa}=req.body
    try {
        if (!name || !age || !size || !type || !image || !apa){
            res.status(400).json({error:'Falta información. La mascota no puede ser dada de alta en el sistema'})
        } else {
            const newPet=await Pet.create(name,age,size,type,image,apa)
            if (newPet) {
                res.status(200).json({message:'La mascosta ha sido dada de alta con éxito'})
            } else {
                res.status(400).json({error: 'La mascota no ha podido ser dada de alta'})
            }
        }
    } catch (error) {
        res.status(400).json(error) 
    }
})



module.exports =petRouter