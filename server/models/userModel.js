import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: Boolean, required: true },
  role: { type: String, required: true },
  create_At: { type: Date, default: Date.now },
  update_At: { type: Date, default: Date.now },
  update_by: { type: Schema.Types.ObjectId, ref: 'User' },
  delete_at: { type: Date },
  delete_by: { type: Schema.Types.ObjectId, ref: 'User' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export const UserModel = mongoose.model('User', UserSchema);
