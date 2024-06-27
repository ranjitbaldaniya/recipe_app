import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
