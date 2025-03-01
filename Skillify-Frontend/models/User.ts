import { Schema, model, Document, models } from "mongoose";
import { unique } from "next/dist/build/utils";

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

const User = models.User || model("User", UserSchema);

export default User;
