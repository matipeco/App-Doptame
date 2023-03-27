const favoritesRouter = require("express").Router();
const Favorites = require("../models/Favs");
const Pet = require("../models/Pet");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const postFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Diego: Agrego esta verificación para saber si la mascota no se encuentra ya en favoritos.
    if(user.favorites.includes(petId)){
      return res.status(400).json({message: "La mascota ya se encuentra en favoritos"})
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    user.favorites.push(petId);
    await user.save();

    res.status(201).json({ message: "Mascota agregada a favoritos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se puede agregar la mascota a favoritos" });
  }
};

// Diego: incluyo handler y controller p/ notificación por email de mascotas favoritas
const sendFavoritesEmail = async (userId) => {
  try{
    const user = await User.findById(userId).populate('favorites');
    const petIds = user.favorites;
    const pets = await Pet.find({_id: { $in: petIds}});

    const petList = pets
      .map((pet) => `${pet.name}, ${pet.age}, ${pet.size}, ${pet.image}, ${pet.description}`)
      .join('\n');

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADMIN,
      to: user.email,
      subject: "Tus mascotas favoritas",
      text: `Estas son tus mascotas favoritas de AppDoptame: \n\n${petList}`,
    };

    await transporter.sendMail(mailOptions);

  } catch(error) {
    console.error(error);
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorites.findByIdAndDelete(req.params.favoriteId);
    if (!favorite) {
      return res.status(404).json({ message: "Favorito no encontrado" });
    }
    res.status(200).json({ message: "Eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ message: "No se pudo eliminar de favoritos" });
  }
};

// const getFavorite = async (req, res) => {
//   try {
//     const favorites = await Favorites.find({
//       user: req.params.userId,
//     }).populate("pet");
//     if (!favorites || favorites.length === 0) {
//       return res.status(404).json({ message: "No se encontraron favoritos" });
//     }
//     res.status(200).json({ favorites });
//   } catch (error) {
//     res.status(500).json({ message: "No se pudo obtener favoritos" });
//   }
// };

const getFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: "No se pudo obtener favoritos" });
  }
};


module.exports = { postFavorite, deleteFavorite, getFavorite, sendFavoritesEmail };
