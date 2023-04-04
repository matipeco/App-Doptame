const Apa = require("../models/Apa");
const Role = require("../models/Roles");
const authApa = require("express").Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const crypto = require("crypto");

require("dotenv").config();

const signUpApa = async (req, res) => {
  const { name, email, password, provincia, role } = req.body;

  // // Buscar si el nombre de usuario ya existe
  const existingApa = await Apa.findOne({ name });

  // // Si el nombre de usuario ya existe, devolver un error
  if (existingApa) {
    return res.status(409).json({ error: "el nombre ya existe" });
  }

  // Buscar si el correo electrónico ya existe
  const existingEmail = await Apa.findOne({ email });

  // Si el correo electrónico ya existe, devolver un error
  if (existingEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  // Si el nombre de usuario y correo electrónico no existen, crear un nuevo usuario y guardarlo en la base de datos
  const newApa = new Apa({
    name,
    email,
    provincia,
    password: await Apa.encryptPasswordApa(password),
  });

  if (role) {
    const foundRole = await Role.find({ name: { $in: role } }); // de todos los que terngo guardado, se busca el role que me mande el user.
    newApa.role = foundRole.map((role) => role._id); // mapeo los roles // se guarda
  } else {
    //si no ingresa role, le mando el que le asigno por default
    const rol = await Role.findOne({ name: "apa" }); // busco el rol asignado
    newApa.role = [rol._id]; //  le asigno el id del rol .
  }

  // Enviar correo electrónico de verificación
  await sendVerificationEmail(newApa.email, newApa.name);

  // Guardar usuario en la base de datos
  const savedApa = await newApa.save(); // save nuevo usuario
  console.log(savedApa);
  const token = jwt.sign({ id: savedApa._id }, config.SECRET);

  res.status(201).json({ token });
};

const sendVerificationEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADMIN,
    to: email,
    subject: "Verify your email",
    html: `<h1>Welcome to our platform, Appdoptame!</h1>
          <p>Please click on the following link to verify your email:</p>
          <a href="${process.env.BASE_URL}/verify-email?email=${email}">Verify email</a>`,
  };

  await transporter.sendMail(mailOptions);
};

// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   console.log(
//     `Email del usuario que solicitó restablecer contraseña: ${email}`
//   );

//   const apa = await Apa.findOne({ email });
//   console.log(`Apa no encontradoa: ${apa}`);

//   if (!apa) {
//     console.log("Apa no encontrada");
//     return res.status(404).json({ message: "Apa no encontrado" });
//   }

//   // Generar una clave aleatoria para restablecer la contraseña y guardarla en la base de datos
//   const resetKey = crypto.randomBytes(6).toString("hex");
//   apa.resetPasswordKey = resetKey;
//   apa.resetPasswordExpires = Date.now() + 3600000; // La expiración es en 1 hora
//   await apa.save();

//   // Enviar correo electrónico con las instrucciones para restablecer la contraseña
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_ADMIN,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_ADMIN,
//     to: email,
//     subject: "Restablecer contraseña",
//     html: `<h1>Restablecer contraseña</h1>
//           <p>Para restablecer su contraseña, use la siguiente clave:</p>
//           <p>${resetKey}</p>`,
//   };

//   await transporter.sendMail(mailOptions);

//   console.log("Correo electrónico enviado");
//   res.json({
//     message:
//       "Se ha enviado un correo electrónico con una clave de restablecimiento.",
//     resetKey: resetKey,
//   });
// };

// const resetPasswordWithEmail = async (req, res) => {
//   const { email, resetPasswordKey, password } = req.body;
//   console.log(
//     `Email del usuario que desea restablecer su contraseña: ${email}`
//   );
//   console.log(
//     `Clave de restablecimiento proporcionada por el usuario: ${resetPasswordKey}`
//   );

//   try {
//     // Buscar el usuario por el correo electrónico
//     const apa = await Apa.findOne({ email });

//     console.log(`Apa encontrado: ${apa}`);

//     if (!apa || apa.resetPasswordKey !== resetPasswordKey) {
//       console.log("Clave de restablecimiento inválida o expirada");
//       return res
//         .status(400)
//         .json({ message: "Clave de restablecimiento inválida o expirada" });
//     }

//     // Actualizar la contraseña y eliminar la clave de restablecimiento de contraseña
//     apa.password = password;
//     apa.resetPasswordKey = undefined;
//     await apa.save();

//     console.log("Contraseña actualizada");
//     res.json({ message: "La contraseña se ha restablecido correctamente." });
//   } catch (err) {
//     console.error(`Error al buscar usuario: ${err}`);
//     return res.status(500).json({ message: "Error al buscar usuario" });
//   }
// };

module.exports = {
  signUpApa,
};
