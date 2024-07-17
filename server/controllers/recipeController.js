import { Recipe } from "../models/recipeModel.js";
import { Review } from "../models/reviewModel.js";

// Create a new recipe with image upload
export const createRecipe = async (req, res) => {
  try {
    const {
      recipe_name_eng,
      recipe_name_hindi,
      recipe_name_guj,
      ingredients_eng,
      ingredients_hindi,
      ingredients_guj,
      recipe_steps_eng,
      recipe_steps_hindi,
      recipe_steps_guj,
      category,
      num_of_people_to_served,
      cooking_time,
      preparation_time,
      difficulty_level,
      video_url,
      status,
      create_by,
      approved
    } = req.body;
console.log("req body ==>" , req.body)
    // Check if req.file exists (assuming multer middleware is configured properly)
    const images = req.file ? req.file.path : "";

    // Validate required fields
    if (
      !recipe_name_eng ||
      !ingredients_eng ||
      !recipe_steps_eng ||
      !category ||
      !num_of_people_to_served
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Create a new Recipe instance
    const newRecipe = new Recipe({
      recipe_name_eng,
      recipe_name_hindi,
      recipe_name_guj,
      ingredients_eng,
      ingredients_hindi,
      ingredients_guj,
      recipe_steps_eng,
      recipe_steps_hindi,
      recipe_steps_guj,
      category,
      num_of_people_to_served,
      cooking_time,
      preparation_time,
      difficulty_level,
      images,
      video_url,
      status,
      create_by,
      approved
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res
      .status(500)
      .json({ message: "Failed to create recipe", error: error.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const { pageIndex, pageSize, category, userId } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (userId) {
      filter.create_by = userId;
    }
    const pageIndexInt = parseInt(pageIndex) || 1;
    const pageSizeInt = parseInt(pageSize) || 0;

    const startIndex = (pageIndexInt - 1) * pageSizeInt;

    const totalRecipes = await Recipe.countDocuments(filter);

    const recipes = await Recipe.find(filter)
      .skip(pageSizeInt ? startIndex : 0)
      .limit(pageSizeInt);

    const pagination = {};
    if (pageSizeInt && startIndex + pageSizeInt < totalRecipes) {
      pagination.next = {
        pageIndex: pageIndexInt + 1,
        pageSize: pageSizeInt,
      };
    }
    if (pageSizeInt && startIndex > 0) {
      pagination.prev = {
        pageIndex: pageIndexInt - 1,
        pageSize: pageSizeInt,
      };
    }

    const recipeIds = recipes.map(recipe => recipe._id);
    const reviews = await Review.find({ recipe_id: { $in: recipeIds } })
      .populate("user_id")
      .lean();

    const reviewMap = {};
    reviews.forEach(review => {
      if (!reviewMap[review.recipe_id]) {
        reviewMap[review.recipe_id] = [];
      }
      reviewMap[review.recipe_id].push(review);
    });

    const recipesWithReviews = recipes.map(recipe => {
      return {
        ...recipe.toObject(),
        reviews: reviewMap[recipe._id] || []
      };
    });

    res.json({
      recipes: recipesWithReviews,
      pagination: pagination,
      totalRecipes: totalRecipes,
      totalPages: pageSizeInt ? Math.ceil(totalRecipes / pageSizeInt) : 1,
      currentPage: pageSizeInt ? pageIndexInt : 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};;

// Get a recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: 'category',
        select: '_id name'
      })
      .lean();

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const reviews = await Review.find({ recipe_id: req.params.id })
      .populate({
        path: 'user_id',
        select: '_id name'
      })
      .select('review rating -_id')
      .lean();

    recipe.reviews = reviews;
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update a recipe by ID
// export const updateRecipe = async (req, res) => {
//   try {
//     const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     console.log(recipe)
//     if (!recipe) return res.status(404).json({ message: "Recipe not found" });
//     res.json(recipe);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    // Check if req.file exists (assuming multer middleware is configured properly)
    const images = req.file ? req.file.path : "";
    // Update only the fields that are part of the request body
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { ...body, images }, // Merge body and images path
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    console.log("Updated recipe:", updatedRecipe); // Check the updated recipe object
    res.json(updatedRecipe); // Send the updated recipe back to the client
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get recipe details by id
export const getRecipeDetails = async (req, res) => {
  console.log("id ==>", req.params.id);
  try {
    // Fetch the recipe by ID
    const recipe = await Recipe.findById(req.params.id).lean();

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Fetch reviews related to the recipe
    const reviews = await Review.find({ recipe_id: req.params.id })
      .populate("user_id")
      .lean();
    console.log("reviews ==>", reviews);

    res.json({ recipe, reviews });
  } catch (error) {
    console.log("error ==>", error);
    res.status(500).json({ message: error.message });
  }
};
