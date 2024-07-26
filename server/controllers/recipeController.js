import { Recipe } from "../models/recipeModel.js";
import { Review } from "../models/reviewModel.js";
import { Category } from "../models/categoryModel.js";
import mongoose from 'mongoose'
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
    const images = req.file ? req.file.path : "";

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
      const categoryIds = [new mongoose.Types.ObjectId(category)];
      const subcategoryIds = await getSubcategoryIds(new mongoose.Types.ObjectId(category));
      subcategoryIds.forEach(id => categoryIds.push(new mongoose.Types.ObjectId(id)));

      console.log('Category IDs:', categoryIds);

      filter.category = { $in: categoryIds };
    }

    if (userId) {
      filter.create_by = new mongoose.Types.ObjectId(userId);
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
};

// Updated to ensure subcategories are correctly fetched
async function getSubcategoryIds(categoryId) {
  let subcategoryIds = [];
  const subcategories = await Category.find({ 'subcategory': categoryId });

  for (const subcategory of subcategories) {
    subcategoryIds.push(subcategory._id.toString());
    const subSubcategoryIds = await getSubcategoryIds(subcategory._id);
    subcategoryIds = subcategoryIds.concat(subSubcategoryIds);
  }

  return subcategoryIds;
}




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
// export const getRecipeById = async (req, res) => {
//   try {
//     // Find the category by ID
//     const categoryId = req.params.id;

//     const category = await Category.findById(categoryId)
//       .populate({
//         path: 'subcategories',
//         populate: {
//           path: 'subcategory',
//           select: '_id name status create_by create_at update_at',
//           options: { strictPopulate: false }
//         }
//       })
//       .lean();

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Prepare the response format
//     const formattedCategory = {
//       _id: category._id,
//       name: category.name,
//       status: category.status,
//       create_by: category.create_by,
//       create_at: category.create_at,
//       update_at: category.update_at,
//       __v: category.__v,
//       subcategories: category.subcategories.map(subcategory => ({
//         _id: subcategory._id,
//         name: subcategory.name,
//         status: subcategory.status,
//         create_by: subcategory.create_by,
//         create_at: subcategory.create_at,
//         update_at: subcategory.update_at,
//         __v: subcategory.__v,
//         subcategory: subcategory.subcategory
//       }))
//     };

//     res.json(formattedCategory);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
  try {
    const images = req.file ? req.file.path : "";
    const updatedFields = {
      ...req.body,
    };

    if (images) {
      updatedFields.images = images;
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.json(recipe);
  } catch (err) {
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
  try {
      const recipe = await Recipe.findById(req.params.id).lean();
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const reviews = await Review.find({ recipe_id: req.params.id })
      .populate("user_id", "user_name","email",)
      .lean();
      res.json({ recipe, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
