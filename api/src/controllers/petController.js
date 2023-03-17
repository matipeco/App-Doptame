const petRouter = require('express').Router();
const petSchema = require('../models/Pet');
const Pet= require('../models/Pet');
const {getApaById} = require ('./apaController');

const getAllPets= async (req,res)=>{
    try {
        const allPets= await Pet.find({});
        res.status(200).json(allPets);   
    } catch (error) {
        res.status(400).json(error)
    }
}

//Me traigo un array de todas las pets.
//Entro a cada una de ellas y busco la propiedad "apa"
//Uso fn getApaById para traerme la info de esa apa, especificament su propiedad location


const getAllPetsWithApaDetails= async (req,res)=>{
    try {
        const allPets= await Pet.find({});
// console.log(allPets)
// console.log(await getApaById(allPets[0].apa))
// console.log(await getApaById(allPets[0].apa).location)

        const petsWithApaDetails = await Promise.all (allPets.map(async (p)=>{
            return await {
                name: p.name,
                age: p.age,
                size: p.size,
                type: p.type,
                image: p.image,
                description: p.description,
                adoption: p.adoption,
                status: p.status,
                apa: await getApaById(p.apa)
                // location: await getApaById(p.apa)
                // location: await getApaById(p.apa).location
            }
        }))
        res.status(200).json(petsWithApaDetails);
    } catch (error) {
        res.status(404).json(error)
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
    const {name,age,size,type,image,apa,description}=req.body
    try {
        if (!name || !age || !size || !type || !image || !apa || !description) {
            res.status(400).json({error:'Falta información. La mascota no puede ser dada de alta en el sistema.'})
        } else {
            const newPet=await Pet.create(req.body)
            
            if (newPet) {
                res.status(200).json({message:'La mascosta ha sido dada de alta con éxito'})
            } else {
                res.status(400).json({error: 'La mascota no ha podido ser dada de alta'})
            }
        }
    } catch (error) {
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
    getAllPetsWithApaDetails,
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



