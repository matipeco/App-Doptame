const {login} = require ('../controllers/loginController')



const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    login(email, password, (err, result) => {
      if (err) {
        // Manejar el error de autenticación
        return res.status(401).json({ error: err.message });
      }
  
      // Devolver los datos del usuario o de la APA
      return res.status(200).json(result);
    })
  }
    
   catch (error) {
    res.status(400).json(error)
    
  }
}



// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const Apa = require('../models/Apa');


// const userLogin = async (req, res) =>{
//   const email = req.body.email;
//   const password = req.body.password;
//   try {
//     const userFound= await User.findOne({ email: email })
//       if (!userFound) {
//         // Si no se encontró un usuario, buscar una APA
//         const apaFound = await Apa.findOne({ email: email })
//           if (!apaFound) {
//             // Si no se encontró un usuario ni una APA, devolver error
//             res.status(404).json('Usuario o APA no encontrado')
//           }
  
//           // Si se encontró una APA, verificar contraseña
//           bcrypt.compare(password, apaFound.password, function (err, isValid) {
//             if (err || !isValid){
//               res.status(400).json('Contraseña incorrecta')
//             } else {
//               res.status(200).json('Contraseña correcta')
//             }
//           })
//         }
//       // Si se encontró un usuario, verificar contraseña
//       bcrypt.compare(password, userFound.password, function (err, isValid) {
//         if (err || !isValid){
//           res.status(400).json('Contraseña incorrecta')
//         } else {
//           res.status(200).json('Contraseña correcta')
//         }
//       })
  
//   } catch (error) {
//     console.log(error)
//     res.status(400).json(error)
//   }
// }






// const userLogin = async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//       const userLogin= await login(email, password)
//       res.status(200).json(userLogin)
   
//     } catch (error) {
//       res.status(404).json(error)
      
//     }

    

  
//     login(email, password, (err, result) => {
//       if (err) {
//         return res.status(401).json({ error: err.message });
//       }
//       return res.status(200).json(result);
//     });


//   }
  
  module.exports = userLogin;