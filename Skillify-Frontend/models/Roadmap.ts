import mongoose, { Schema, Document } from "mongoose";

interface IRoadmap extends Document {
  roadColor: string;
  milestoneColor: string;
  backgroundColor: string;
  user: mongoose.Types.ObjectId;
  milestones: mongoose.Types.ObjectId[];
}

const RoadmapSchema: Schema = new Schema({
  roadColor: { type: String, required: true },
  milestoneColor: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Milestone" }],
});

const Roadmap =
  mongoose.models.Roadmap || mongoose.model<IRoadmap>("Roadmap", RoadmapSchema);
export default Roadmap;
