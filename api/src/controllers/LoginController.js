const User = require("../models/User");
const LoginController = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Apa = require("../models/Apa");
const Admin = require("../models/Admin");
const { OAuth2Client } = require("google-auth-library");
const Role = require("../models/Roles");

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const Login = async (req, res) => {
  const { email, password, userType } = req.body;

  if (userType === "user") {
    const userFound = await User.findOne({ email }).populate("role");

    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    console.log(password);
    const matchedPassword = await User.comparePassword(
      password,
      userFound.password
    );
    console.log(userFound.password);
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
  } else if (userType === "admin") {
    const adminFound = await Admin.findOne({ email }).populate("role");
    if (!adminFound) {
      return res.status(400).json({ message: "Admin no encontrad0" });
    }

    if (password !== adminFound.password) {
      return res
        .status(401)
        .json({ token: null, message: "contraseña invalida" });
    }

    const token = jwt.sign({ id: adminFound._id }, config.SECRET, {
      expiresIn: 86400, //24 hs
    });

    res.json({ token });
  } else {
    return res.status(400).json({ message: "Tipo de usuario no válido" });
  }
};

const LoginWithGoogle = async (req, res) => {
  const { tokenId, role } = req.body;
  console.log(tokenId);

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"];
    console.log(userId);

    const userName = payload["name"];
    console.log(userName);

    const userEmail = payload["email"];
    console.log(userEmail);

    // Buscar en la base de datos si ya existe un usuario con el id de Google
    let userFound = await User.findOne({ email: userEmail });
    // Si el usuario no existe, crear un nuevo documento en la colección de usuarios
    if (!userFound) {
      let username;
      if (userName) {
        username = userName.replace(/\s+/g, "");
      }

      // Crear un nuevo documento de usuario
      const newUser = new User({
        username: username,
        email: userEmail,
        googleId: userId,
      });

      if (role) {
        const foundRole = await Role.find({ name: { $in: role } }); // de todos los que terngo guardado, se busca el role que me mande el user.
        newUser.role = foundRole.map((role) => role._id); // mapeo los roles // se guarda
      } else {
        //si no ingresa role, le mando el que le asigno por default
        const rol = await Role.findOne({ name: "user" }); // busco el rol asignado
        newUser.role = [rol._id]; //  le asigno el id del rol .
      }
      try {
        userFound = await newUser.save();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error al crear un nuevo usuario" });
      }
    }

    // Si el usuario ya existe, actualizar su información
    // if (userFound) {
    //   if (userName) {
    //     userFound.username = userName.replace(/\s+/g, "");
    //   }

    //   if (userEmail) {
    //     userFound.email = userEmail;
    //   }

    //   // Actualizar el ID de Google
    //   if (userFound.googleId !== userId) {
    //     userFound.googleId = userId;
    //   }

    //   // Guardar el usuario actualizado en la base de datos
    //   try {
    //     await userFound.save();
    //   } catch (error) {
    //     console.error(error);
    //     return res
    //       .status(500)
    //       .json({ message: "Error al actualizar la información del usuario" });
    //   }
    // }

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
