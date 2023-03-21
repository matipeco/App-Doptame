const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Apa = require('../models/Apa');


function login(email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        // Si no se encontró un usuario, buscar una APA
        Apa.findOne({ email: email }, function (err, apa) {
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
            //   name: apa.name,
            //   email: apa.email,
            //   phone: apa.phone
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
        //   nickname: user.nickname,
        //   email: user.email
        });
      });
    });
  }



// function login(email, password, callback) {
//   User.findOne({ email: email }, function (err, user) {
//     if (err  !user) {
//       // Si no se encontró un usuario, buscar una APA
//       Apa.findOne({ email: email }, function (err, apa) {
//         if (err  !apa) {
//           // Si no se encontró un usuario ni una APA, devolver error
//           return callback(err  new WrongUsernameOrPasswordError(email));
//         }

//         // Si se encontró una APA, verificar contraseña
//         bcrypt.compare(password, apa.password, function (err, isValid) {
//           if (err  !isValid) return callback(err  new WrongUsernameOrPasswordError(email));

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
//       if (err  !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

//       // Devolver información del usuario
//       return callback(null, {
//         user_id: user._id.toString(),
//         nickname: user.nickname,
//         email: user.email
//       });
//     });
//   });
// }

module.export = {login}