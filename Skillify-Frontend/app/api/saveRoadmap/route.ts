import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database"; // Ensure you have dbConnect setup
import Roadmap from "../../../models/Roadmap";
import Milestone from "../../../models/Milestone";
import User from "../../../models/User";
import { use } from "react";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { roadmap, email, colors } = await req.json();
    console.log("Roadmap:", roadmap);
    console.log("User Email:", email);
    console.log("Colors:", colors);

    const user = await User.findOne({ email });

    console.log("User ID:", user ? user._id : "User not found");

    if (!roadmap || !email || !colors) {
      return NextResponse.json(
        { error: "Roadmap, user ID, and colors are required." },
        { status: 400 }
      );
    }

    // Step 1: Create Roadmap first
    const newRoadmap = new Roadmap({
      roadColor: colors.roadColor,
      roadmapName: roadmap.roadmapName,
      milestoneColor: colors.milestoneColor,
      backgroundColor: colors.backgroundColor,
      user: user._id,
      milestones: [], // Empty for now, will update later
    });

    await newRoadmap.save();

    // Step 2: Create Milestones with roadmap reference
    const milestones = await Promise.all(
      roadmap.milestones.map(async (milestone: any, index: number) => {
        const newMilestone = new Milestone({
          milestoneNumber: index + 1,
          milestoneName: milestone.milestoneName,
          milestoneDescription: milestone.description,
          milestoneLink: milestone.courseLink,
          roadmap: newRoadmap._id, // Assign the roadmap ID now
        });
        await newMilestone.save();
        return newMilestone._id;
      })
    );

    // Step 3: Update Roadmap with milestones
    newRoadmap.milestones = milestones;
    await newRoadmap.save();

    // Step 4: Update User with Roadmap Reference
    await User.findByIdAndUpdate(user._id, {
      $push: { roadmaps: newRoadmap._id },
    });

    return NextResponse.json(newRoadmap);
  } catch (error) {
    console.error("Error saving roadmap:", error);
    return NextResponse.json(
      { error: "Failed to save roadmap" },
      { status: 500 }
    );
  }
}
