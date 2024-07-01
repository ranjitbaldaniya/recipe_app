import { Category } from "../models/categoryModel.js";

// Function to create a category and its nested subcategories
export const createNestedCategories = async (categoryData, userId) => {

  console.log("====>" , categoryData , userId)
    if (categoryData.subcategories && categoryData.subcategories.length > 0) {
      for (let i = 0; i < categoryData.subcategories.length; i++) {
        const subcategory = await createNestedCategories(categoryData.subcategories[i], userId);
        categoryData.subcategories[i] = subcategory._id;
      }
    }
    categoryData.create_by = userId;
    categoryData.update_by = userId;
    const category = new Category(categoryData);
    await category.save();
    return category;
  };




  export const getCategoryWithSubcategories = async (categoryId) => {
    const category = await Category.findOne({
      _id: categoryId,
      delete_at: { $exists: false }, // Only fetch if not soft deleted
    }).populate('subcategory').exec();
  
    if (!category) return null;
  
    const subcategories = await Category.find({
      subcategory: categoryId,
      delete_at: { $exists: false }, // Only fetch if not soft deleted
    });
  
    const subcategoryDetails = await Promise.all(
      subcategories.map(sub => getCategoryWithSubcategories(sub._id))
    );
  
    return {
      ...category._doc,
      subcategories: subcategoryDetails
    };
  };


//   // Get all categories with nested subcategories
// export const getCategories = async (req, res) => {
//   try {
//     // Fetch all top-level categories (those with subcategory: null)
//     const topLevelCategories = await Category.find({ subcategory: null });

//     // Build the hierarchy for each top-level category
//     const categoriesWithHierarchy = await Promise.all(
//       topLevelCategories.map(category => getCategoryWithSubcategories(category._id))
//     );

//     res.json(categoriesWithHierarchy);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
