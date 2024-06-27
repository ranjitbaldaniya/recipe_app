import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  recipe_name_eng: { type: String, required: true },
  recipe_name_hindi: { type: String },
  recipe_name_guj: { type: String },
  ingredients_eng: { type: String, required: true },
  ingredients_hindi: { type: String },
  ingredients_guj: { type: String },
  recipe_steps_eng: { type: String, required: true },
  recipe_steps_hindi: { type: String },
  recipe_steps_guj: { type: String },
  categories: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_categories: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  num_of_people_to_served: { type: Number, required: true },
  images: { type: String, required: true },
  video_url: { type: String },
  status: { type: Boolean, default: true },
  approved: { type: Boolean, default: false },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  create_at: { type: Date, default: Date.now },
  delete_at: { type: Date }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
