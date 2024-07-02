import { Favorite } from "../models/favoriteModel.js";

//create a new favorite
export const createFavorite = async (req, res) => {
  try {
    const { user_id, recipe_id } = req.body;
    const favorite = new Favorite({ user_id, recipe_id });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all favorites for a user
export const getFavoriteOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user_id: userId }).populate(
      "recipe_id"
    );
    res.status(200).json(favorites);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a favorite
export const deleteFavoriteForUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.status(200).json({ message: "Favorite deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
