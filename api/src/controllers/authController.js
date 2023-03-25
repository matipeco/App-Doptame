const User = require("../models/User");
const authController = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const signIn = async (req, res) => {
  res.json("hola");
};

const signUp = async (req, res) => {
  const { name, email, password, username } = req.body;

  // Buscar si el nombre de usuario ya existe
  const existingUser = await User.findOne({ username });

  // Si el nombre de usuario ya existe, devolver un error
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // Buscar si el correo electrónico ya existe
  const existingEmail = await User.findOne({ email });

  // Si el correo electrónico ya existe, devolver un error
  if (existingEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  // Si el nombre de usuario y correo electrónico no existen, crear un nuevo usuario y guardarlo en la base de datos
  const newUser = new User({
    username,
    name,
    email,
    password: await User.encryptPassword(password),
  });

  // Enviar correo electrónico de verificación
  await sendVerificationEmail(newUser.email, newUser.name);

  // Guardar usuario en la base de datos
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
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

module.exports = { signIn, signUp };
