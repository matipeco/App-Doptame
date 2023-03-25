const User = require("../models/User");
const LoginController = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Apa = require("../models/Apa");

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

module.exports = Login;
