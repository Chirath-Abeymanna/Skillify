import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database"; // Ensure you have dbConnect setup
import Milestone from "../../../models/Milestone";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { milestoneName, roadmapId, completed } = await req.json();

    // Get all milestones for this roadmap
    const allMilestones = await Milestone.find({ roadmap: roadmapId })
      .sort({ milestoneNumber: 1 });

    // Find the current milestone's index
    const currentIndex = allMilestones.findIndex(m => m.milestoneName === milestoneName);
    
    if (currentIndex === -1) {
      return NextResponse.json(
        { error: "Milestone not found." },
        { status: 404 }
      );
    }

    // Update current milestone
    const updatedMilestone = await Milestone.findOneAndUpdate(
      { milestoneName, roadmap: roadmapId },
      { completed: true },
      { new: true }
    );

    // If this milestone is completed and it's not the last one,
    // make the next milestone accessible
    if (completed && currentIndex < allMilestones.length - 1) {
      await Milestone.findByIdAndUpdate(
        allMilestones[currentIndex + 1]._id,
        { accessible: true },
        { new: true }
      );
    }

    // Fetch updated milestones
    const updatedMilestones = await Milestone.find({ roadmap: roadmapId })
      .sort({ milestoneNumber: 1 });

    return NextResponse.json({ 
      message: "Milestone status updated.",
      allMilestones: updatedMilestones
    });
  } catch (error) {
    console.error("Error updating milestone status:", error);
    return NextResponse.json(
      { error: "Failed to update milestone status" },
      { status: 500 }
    );
  }
}
