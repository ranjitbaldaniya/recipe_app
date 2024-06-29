import express from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js'; 

const recipeRoute = express.Router();

recipeRoute.post('/', createRecipe);
recipeRoute.get('/', getRecipes);
recipeRoute.get('/:id', getRecipeById);
recipeRoute.put('/:id', updateRecipe);
recipeRoute.delete('/:id', deleteRecipe);

export default recipeRoute;
