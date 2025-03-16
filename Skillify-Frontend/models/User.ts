import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  //Added the review and star No:
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  provider: string;
  reviews: string[];
  starNo: number;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  avatar: { type: String, default: "default" },
  provider: { type: String, default: "" },
  reviews: { type: [String], default: [] },
  starNo: { type: Number, default: 0 },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
