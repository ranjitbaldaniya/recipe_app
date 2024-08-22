import express from "express";
import { Review } from "../models/reviewModel.js";
import {
  createReview,
  deleteReview,
  getAllReview,
  updateReview,
} from "../controllers/reviewController.js";
import { approveReview, rejectReview, getPendingReviews } from "../controllers/reviewController.js";
import { approveRecipe, getPendingRecipe } from "../controllers/recipeController.js";

const reviewRoute = express.Router();
const adminRoute = express.Router();

// Create a new review
reviewRoute.post("/", createReview);

// Get all reviews for a recipe
reviewRoute.get("/recipe/:recipeId", getAllReview);

// Update a review
reviewRoute.put("/:id", updateReview);

// Delete a review
reviewRoute.delete("/:id", deleteReview);
adminRoute.put("/approve/:id", approveReview);
adminRoute.delete("/reject/:id", rejectReview);
adminRoute.get("/review-pending", getPendingReviews);
adminRoute.get("/recipe-pending", getPendingRecipe);
adminRoute.put("/approveRecipe/:id", approveRecipe)


export default reviewRoute;
