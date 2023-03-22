const favoritesRouter = require("express").Router();
const Favorites = require("../models/Favs");
const Pet = require("../models/Pet");
const User = require("../models/User");

const postFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    user.favorites.push(petId);
    await user.save();

    res.status(201).json({ message: "Pet added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not add pet to favorites" });
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

const getFavorite = async (req, res) => {
  try {
    const favorites = await Favorites.find({
      user: req.params.userId,
    }).populate("pet");
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No se encontraron favoritos" });
    }
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "No se pudo obtener favoritos" });
  }
};

module.exports = { postFavorite, deleteFavorite, getFavorite };
