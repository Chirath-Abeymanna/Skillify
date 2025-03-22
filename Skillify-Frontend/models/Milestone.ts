import mongoose, { Schema, Document } from "mongoose";

interface IMilestone extends Document {
  milestoneNumber: number;
  milestoneName: string;
  milestoneDescription: string;
  milestoneLink: string;
  completed: boolean;
  accessible: boolean; // Add this field
  roadmap: mongoose.Types.ObjectId;
}

const MilestoneSchema: Schema = new Schema({
  milestoneNumber: { type: Number, required: true },
  milestoneName: { type: String, required: true },
  milestoneDescription: { type: String, required: true },
  milestoneLink: { type: String, required: true },
  completed: { type: Boolean, default: false },
  accessible: { type: Boolean, default: false }, // Add this field
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: true,
  },
});

const Milestone =
  mongoose.models.Milestone ||
  mongoose.model<IMilestone>("Milestone", MilestoneSchema);
export default Milestone;
