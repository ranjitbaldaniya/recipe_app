import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

export const Review = mongoose.model('Review', ReviewSchema);
