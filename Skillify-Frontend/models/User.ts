import { Schema, model, Document, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  lastName: {
    type: String,
  },

  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: "default",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
