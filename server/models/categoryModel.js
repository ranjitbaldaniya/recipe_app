import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  create_by: { type: Schema.Types.ObjectId, ref: 'User' },
  update_by: { type: Schema.Types.ObjectId, ref: 'User' },
  delete_at: { type: Date },
  delete_by: { type: Schema.Types.ObjectId, ref: 'User' },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }
});

export const Category = mongoose.model('Category', CategorySchema);


// {
//   "_id": "60d1f9f60c916231d0d5c711",
//   "name": "Dinner",
//   "status": true,
//   "create_at": "2021-06-22T00:00:00.000Z",
//   "update_at": "2021-06-22T00:00:00.000Z",
//   "subcategories": [
//     {
//       "_id": "60d1f9f60c916231d0d5c712",
//       "name": "Spicy",
//       "status": true,
//       "create_at": "2021-06-22T00:00:00.000Z",
//       "update_at": "2021-06-22T00:00:00.000Z",
//       "subcategories": [
//         {
//           "_id": "60d1f9f60c916231d0d5c713",
//           "name": "Hot Spicy",
//           "status": true,
//           "create_at": "2021-06-22T00:00:00.000Z",
//           "update_at": "2021-06-22T00:00:00.000Z",
//           "subcategories": [
//   {
//            "_id": "60d1f9f60c916231d0d5c713",
//            "name": "panir tadka",
//            "status": true,
//            "create_at": "2021-06-22T00:00:00.000Z",
//            "update_at": "2021-06-22T00:00:00.000Z",
//            "subcategories": []
//          }
// ]
//         },
//         {
//           "_id": "60d1f9f60c916231d0d5c714",
//           "name": "Chilli Masala",
//           "status": true,
//           "create_at": "2021-06-22T00:00:00.000Z",
//           "update_at": "2021-06-22T00:00:00.000Z",
//           "subcategories": []
//         }
//       ]
//     },
    // {
    //   "_id": "60d1f9f60c916231d0d5c715",
    //   "name": "Normal",
    //   "status": true,
    //   "create_at": "2021-06-22T00:00:00.000Z",
    //   "update_at": "2021-06-22T00:00:00.000Z",
    //   "subcategories": []
    // }
//   ]
// }
