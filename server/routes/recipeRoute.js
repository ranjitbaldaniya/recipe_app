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
<<<<<<< HEAD
recipeRoute.put("/:id",uploadSingle, updateRecipe);
=======
recipeRoute.put("/:id", uploadSingle,updateRecipe);
>>>>>>> f1a0fe8af0a5e0bb8c2022fa807cd11d0caa2f37
recipeRoute.delete("/:id", deleteRecipe);

//get recipe details with rate and review 
recipeRoute.get("/details/:id", getRecipeDetails);

export default recipeRoute;
