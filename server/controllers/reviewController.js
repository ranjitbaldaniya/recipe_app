import { Review } from "../models/reviewModel.js";

// Create review route
export const createReview = async (req, res) => {
  try {
    const { user_id, recipe_id, rating, review } = req.body;
    const newReview = new Review({ user_id, recipe_id, rating, review, approved: false });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Approve review
export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedReview = await Review.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.status(200).json(approvedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Reject review
export const rejectReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review rejected and deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews for a recipe
export const getAllReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await Review.find({ recipe_id: recipeId, approved: true }).populate("user_id");
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
      { rating, review, updated_at: Date.now(), approved: false },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get pending reviews
export const getPendingReviews = async (req, res) => {
  try {
    const pendingReviews = await Review.find({ approved: false }).populate("user_id");
    res.status(200).json(pendingReviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
