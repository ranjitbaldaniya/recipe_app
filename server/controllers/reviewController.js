import { Review } from "../models/reviewModel.js";

//create review route
export const createReview = async (req, res) => {
  try {
    const { user_id, recipe_id, rating, review } = req.body;
    const newReview = new Review({ user_id, recipe_id, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get all review for recipe
export const getAllReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await Review.find({ recipe_id: recipeId }).populate(
      "user_id"
    );
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, review, updated_at: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete review 
export const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      await Review.findByIdAndDelete(id);
      res.status(200).json({ message: "Review deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
