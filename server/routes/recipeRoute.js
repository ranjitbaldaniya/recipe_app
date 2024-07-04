import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipeDetails,
} from "../controllers/recipeController.js";
import uploadSingle from "../middlewares/uploadMiddleware.js";

const recipeRoute = express.Router();

recipeRoute.post("/",uploadSingle,createRecipe);
recipeRoute.get("/", getRecipes);
recipeRoute.get("/:id", getRecipeById);
recipeRoute.put("/:id", updateRecipe);
recipeRoute.delete("/:id", deleteRecipe);

//get recipe details with rate and review 
recipeRoute.get("/details/:id", getRecipeDetails);

export default recipeRoute;
