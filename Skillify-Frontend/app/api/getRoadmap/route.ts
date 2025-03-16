import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database"; // Ensure you have dbConnect setup
import Roadmap from "../../../models/Roadmap";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const roadmapId = searchParams.get("roadmapId");

    if (!roadmapId) {
      return NextResponse.json(
        { error: "Roadmap ID is required." },
        { status: 400 }
      );
    }

    const roadmap = await Roadmap.findById(roadmapId).populate("milestones");

    if (!roadmap) {
      return NextResponse.json(
        { error: "Roadmap not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}
