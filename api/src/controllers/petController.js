const petRouter = require('express').Router();
const petSchema = require('../models/Pet');
const Pet= require('../models/Pet');
const Apa= require('../models/Apa');

const getAllPets= async (req,res)=>{
    try {
        const allPets= await Pet.find({}).populate('apa');
        res.status(200).json(allPets);   
    } catch (error) {
        res.status(400).json(error)
    }
}

const getPetById= async (req,res)=>{
    try {
        const petWithApa=await Pet.findById(req.params.petId).populate('apa');
//Si encontró la Pet
        if (petWithApa) {
            res.status(200).json(petWithApa);
        //Si no encontró la Pet
        } 
        else{
            res.status(404).json({error: 'Mascota no encontrada'});
        }
    } catch (error) {
        res.status(404).json(error)
    }
}

const createPet =async (req,res)=>{
    
    try {
        
        const {name,age,size,type,image,description}=req.body // Diego: sacamos apa, ya no la requerimos por body porque viene por params
        if (!name || !age || !size || !type || !image || !description) {
            res.status(400).json({error:'Falta información. La mascota no puede ser dada de alta en el sistema.'})
        } else {
            const {apaId} = req.params
            const objeto = {...req.body, apa: apaId}
            const newPet=await Pet.create(objeto)
            await Apa.findByIdAndUpdate(apaId, {$push:{pets: newPet._id}}, {useFindAndModify: false})

            if (newPet) {
                res.status(200).json({message:'La mascosta ha sido dada de alta con éxito'})
            } else {
                res.status(400).json({error: 'La mascota no ha podido ser dada de alta'})
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error) 
    }
}

const editPet = async (req, res) => {
    try {
        const petEdit = await Pet.findByIdAndUpdate(
            req.params.petId,
            req.body,
            { new: true }
        );
        // console.log(petEdit)
        res.status(200).json('Mascota modificada exitosamente');
    } catch (error) {
        console.log(error)
        res.status(400).json('La mascota no pudo ser editada');
    }
}

const deletePet =async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.petId);
        res.status(200).json('La mascosta fue eliminada definitivamente de la base de datos');
    } catch (error) {
        res.status(400).json({ error: 'La mascota no fue eliminada de la base de datos' });
    }
}


module.exports={
    getAllPets,
    getPetById,
    createPet,
    editPet,
    deletePet
}


// // getPetById (VERSIÓN ANTERIOR, SIN POPULATE)
// petRouter.get=('/:petId', async (req,res)=>{
//     const {petId}=req.params;
//     try {
//         const pet=await Pet.findById(petId)
// //Si encontró la Pet
//         if (pet) {
// //Bucar a qué APA pertenece
//             const apa= await Apa.findById(pet.apa) //Agregué al Model Pet el atributo"apa", cuyo valor es el id de la APA.
// //Si encontró la APA
//             if (apa) {
//                 //Tomar su location y asignarla a la Pet
//                 const petWithLocation= getPetWithLocation(pet,apa);
//                 res.status(200).json(petWithLocation)
// //Si no encontró la Apa
//             } else {
//                 res.status(404).json({error: 'APA no encontrada'})
//             }
//         //Si no encontró la Pet
//         } else{
//             res.status(404).json({error: 'Mascota no encontrada'});
//         }
//     } catch (error) {
//         res.status(404).json(error)
//     }
// })



// //createPet: otra syntax
// petRouter.post('/create', async (req,res)=>{
//     if (!req.body){
//         res.status(400).json(error.message)
//     } else{
//         const pet= petSchema(req.body);
//         pet
//             .save()
//             .then((data)=>res.json(data))
//             .catch((error)=>res.json(error));
//     }
// })



