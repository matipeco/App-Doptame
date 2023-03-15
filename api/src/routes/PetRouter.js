const petRouter = require('express').Router();
const petSchema = require('../models/Pet');

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




//getPetById (VERSIÓN ANTERIOR, SIN POPULATE)
petRouter.get=('/:petId', async (req,res)=>{
    const {petId}=req.params;
    try {
        const petWithApa=await Pet.findById(petId).populate('apa');
//Si encontró la Pet
        if (petWithApa) {
            res.status(200).json(petWithApa);
        //Si no encontró la Pet
        } else{
            res.status(404).json({error: 'Mascota no encontrada'});
        }
    } catch (error) {
        res.status(404).json(error)
    }
})


// //getPetById (VERSIÓN ANTERIOR, SIN POPULATE)
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




//postPet FORMA NUEVA

petRouter.post('/', async (req,res)=>{
    if (!req.body){
        res.status(400).json({error:'Falta información. La mascota no puede ser dada de alta en el sistema'})
    } else{
        const newPet= petSchema(req.body);
        newPet
            .save()
            .then((data)=>res.json(data))
            .catch((error)=>res.json({message: error}));
    }
})









// //postPet VERSION VIEJA
// petRouter.post('/', async (req,res)=>{
//     const {name,age,size,type,image,apa}=req.body
//     try {
//         if (!name || !age || !size || !type || !image || !apa) {
//             res.status(400).json({error:'Falta información. La mascota no puede ser dada de alta en el sistema'})
//         } else {
//             const newPet=await Pet.create(name,age,size,type,image,apa)
             
//             if (newPet) {
//                 res.status(200).json({message:'La mascosta ha sido dada de alta con éxito'})
//             } else {
//                 res.status(400).json({error: 'La mascota no ha podido ser dada de alta'})
//             }
//         }
//     } catch (error) {
//         res.status(400).json(error) 
//     }
// })


module.exports =petRouter