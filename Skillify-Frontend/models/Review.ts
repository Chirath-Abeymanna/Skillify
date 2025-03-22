import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userEmail: string;
  userName: string;
  profession: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  userEmail: {
    type: String,
    required: [true, 'User email is required'],
  },
  userName: { 
    type: String, 
    required: [true, 'User name is required']
  },
  profession: { 
    type: String, 
    required: [true, 'Profession is required'],
    trim: true,
    minLength: [2, 'Profession must be at least 2 characters long']
  },
  rating: { 
    type: Number, 
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: { 
    type: String, 
    required: [true, 'Comment is required'],
    trim: true,
    minLength: [10, 'Comment must be at least 10 characters long']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Check if the model exists before creating a new one
const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;