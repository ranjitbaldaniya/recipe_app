import express from "express";

import { approveReview, rejectReview, getPendingReviews } from "../controllers/reviewController.js";
import { approveRecipe, getPendingRecipe } from "../controllers/recipeController.js";

const adminRoute = express.Router();

adminRoute.put("/approve/:id", approveReview);
adminRoute.delete("/reject/:id", rejectReview);
adminRoute.get("/review-pending", getPendingReviews);
adminRoute.get("/recipe-pending", getPendingRecipe)
adminRoute.put("/approveRecipe/:id", approveRecipe)


export default adminRoute;
