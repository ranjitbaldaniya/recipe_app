import { Category } from "../models/categoryModel.js";
import { getCategoryWithSubcategories } from "../utils/common.js";

// Create a new category
export const createCategory = async (req, res) => {
  // console.log("req.body ==>" , req.body)
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.log("error in category ===>", err);
    res.status(400).json({ message: err.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
   // Fetch all top-level categories (those with subcategory: null)
   const topLevelCategories = await Category.find({ subcategory: null });

   // Build the hierarchy for each top-level category
   const categoriesWithHierarchy = await Promise.all(
     topLevelCategories.map(category => getCategoryWithSubcategories(category._id))
   );

   res.json(categoriesWithHierarchy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "subcategories"
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
