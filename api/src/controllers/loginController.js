// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Apa = require('../models/Apa');





const login = async (email, password, callback) => {
  try {
    
    await User.findOne({ email: email }, async function (err, user) {
      if (err || !user) {
        // Si no se encontró un usuario, buscar una APA
         await Apa.findOne({ email: email }, function (err, apa) {
          if (err || !apa) {
            // Si no se encontró un usuario ni una APA, devolver error
            return callback(err || new WrongUsernameOrPasswordError(email));
          }
  
          // Si se encontró una APA, verificar contraseña
          bcrypt.compare(password, apa.password, function (err, isValid) {
            if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
            // Devolver información de la APA
            return callback(null, {
              apa_id: apa._id,
              // name: apa.name,
              // email: apa.email,
              // phone: apa.phone
            });
          });
        });
        return;
      }
  
      // Si se encontró un usuario, verificar contraseña
      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
        // Devolver información del usuario
        return callback(null, {
          user_id: user._id,
          // nickname: user.nickname,
          // email: user.email
        });
      });
    });





  } catch (erro) {
    console.log(erro)
    res.status(400).json(erro)
  }


  
}

module.export = {login}



// const login = async (email, password) =>{
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





// function login(email, password, callback) {
//   User.findOne({ email: email }, function (err, user) {
//     if (err || !user) {
//       // Si no se encontró un usuario, buscar una APA
//       Apa.findOne({ email: email }, function (err, apa) {
//         if (err || !apa) {
//           // Si no se encontró un usuario ni una APA, devolver error
//           return callback(err || new WrongUsernameOrPasswordError(email));
//         }

//         // Si se encontró una APA, verificar contraseña
//         bcrypt.compare(password, apa.password, function (err, isValid) {
//           if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

//           // Devolver información de la APA
//           return callback(null, {
//             apa_id: apa._id.toString(),
//             name: apa.name,
//             email: apa.email,
//             phone: apa.phone
//           });
//         });
//       });
//       return;
//     }

//     // Si se encontró un usuario, verificar contraseña
//     bcrypt.compare(password, user.password, function (err, isValid) {
//       if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

//       // Devolver información del usuario
//       return callback(null, {
//         user_id: user._id.toString(),
//         nickname: user.nickname,
//         email: user.email
//       });
//     });
//   });
// }