// const apaRouter = require('express').Router();
// const Pet = require("../models/Pet");
// const User = require("../models/User");
// const Apa = require("../models/User");
// const nodemailer = require("nodemailer");
// require("dotenv").config();


// const postReview= async (req, res)=>{
//     // const {apaId} = req.params
//     // const {review} = req.body
    
//     try {
//         const apa=await Apa.findById(req.params.apaId)
        
//         apa.reviews.push({
//             opinion: req.body.opinion,
//             rating: req.body.rating,
//             user: req.body.user
//         })

//         // apa.reviews.push(review)

//         await apa.save()
//         res.status(200).json(apa)


//     } catch (error) {
//         res.status(400).json(error)
        
//     }
// }







// module.exports = {postReview}



// //SOLUCION DE CHAT
// // apaSchema.findOne({ _id: id }, function(err, apa) {
// //     if (err) {
// //       res.status(500).send(err);
// //     } else {
// //       apa.reviews.push({
// //         opinion: req.body.opinion,
// //         rating: req.body.rating,
// //         user: req.body.user
// //       });
// //       apa.save(function(err, updatedApa) {
// //         if (err) {
// //           res.status(500).send(err);
// //         } else {
// //           res.send(updatedApa);
// //         }
// //       });
// //     }
// //   });
  

