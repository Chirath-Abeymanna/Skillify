import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database"; // Ensure you have dbConnect setup
import Milestone from "../../../models/Milestone";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { milestoneName, completed } = await req.json();

    if (!milestoneName) {
      return NextResponse.json(
        { error: "Milestone name is required." },
        { status: 400 }
      );
    }

    const milestone = await Milestone.findOne({ milestoneName });

    if (!milestone) {
      return NextResponse.json(
        { error: "Milestone not found." },
        { status: 404 }
      );
    }

    milestone.completed = completed;
    await milestone.save();

    return NextResponse.json({ message: "Milestone status updated." });
  } catch (error) {
    console.error("Error updating milestone status:", error);
    return NextResponse.json(
      { error: "Failed to update milestone status" },
      { status: 500 }
    );
  }
}
