import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
