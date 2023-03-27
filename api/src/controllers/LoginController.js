const User = require("../models/User");
const LoginController = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Apa = require("../models/Apa");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const Login = async (req, res) => {
  const { email, password, userType } = req.body;

  if (userType === "user") {
    const userFound = await User.findOne({ email }).populate("role");
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const matchedPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchedPassword) {
      return res
        .status(401)
        .json({ token: null, message: "contraseña invalida" });
    }

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, //24 hs
    });

    res.json({ token });
  } else if (userType === "apa") {
    const apaFound = await Apa.findOne({ email }).populate("role");
    if (!apaFound) {
      return res.status(400).json({ message: "Apa no encontrada" });
    }

    const matchedPassword = await Apa.comparePasswordApa(
      password,
      apaFound.password
    );
    if (!matchedPassword) {
      return res
        .status(401)
        .json({ token: null, message: "contraseña invalida" });
    }

    const token = jwt.sign({ id: apaFound._id }, config.SECRET, {
      expiresIn: 86400, //24 hs
    });

    res.json({ token });
  } else {
    return res.status(400).json({ message: "Tipo de usuario no válido" });
  }
};

const LoginWithGoogle = async (req, res) => {
  const { tokenId } = req.body;
  console.log(tokenId);
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    console.log(userId);
    const userName = payload["name"]; // Obtener el nombre del usuario de Google
    console.log(userName);

    const userEmail = payload["email"]; // Obtener el correo electrónico del usuario
    console.log(userEmail);

    // Buscar en la base de datos si ya existe un usuario con el id de Google
    let userFound = await User.findOne({ googleId: userId });

    // Si el usuario no existe, crear un nuevo documento en la colección de usuarios
    if (!userFound) {
      let username;
      if (userName) {
        username = userName.replace(/\s+/g, ""); // Eliminar espacios del nombre de usuario
      } else {
        username = userEmail;
      }

      // Crear un nuevo documento de usuario
      const newUser = new User({
        username: username,
        email: userEmail,
        password: await User.encryptPassword(generatePassword()),
        role: "user",
        googleId: userId, // agregar el ID de Google al documento
      });
      if (userId) {
        newUser.googleId = userId;
        newUser.role = "user";
      } else {
        // Asignar los roles especificados por el usuario si no está registrándose con Google
        if (role) {
          const foundRoles = await Role.find({ name: { $in: role } });
          newUser.role = foundRoles.map((role) => role._id);
        } else {
          // Asignar el rol "user" por defecto si no se especificó ningún rol
          const userRole = await Role.findOne({ name: "user" });
          newUser.role = [userRole._id];
        }
      }
      // Guardar el nuevo usuario en la base de datos
      try {
        userFound = await newUser.save();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error al crear un nuevo usuario" });
      }
    }

    // Si el usuario ya existe, actualizar el ID de Google
    if (userFound.googleId !== userId) {
      userFound.googleId = userId;

      // Guardar el usuario actualizado en la base de datos
      try {
        await userFound.save();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error al actualizar el ID de Google" });
      }
    }
    console.log(userFound);

    // Generar un token de autenticación para el usuario
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, //24 hs
    });
    console.log(token);

    // Devolver el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al autenticar con Google" });
  }
};

module.exports = { Login, LoginWithGoogle };
