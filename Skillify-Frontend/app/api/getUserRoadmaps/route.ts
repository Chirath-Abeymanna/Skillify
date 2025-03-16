import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database"; // Ensure you have dbConnect setup
import User from "../../../models/User";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).populate("roadmaps");

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ roadmaps: user.roadmaps });
  } catch (error) {
    console.error("Error fetching user roadmaps:", error);
    return NextResponse.json(
      { error: "Failed to fetch user roadmaps" },
      { status: 500 }
    );
  }
}
