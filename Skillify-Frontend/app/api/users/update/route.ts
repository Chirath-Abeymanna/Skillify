import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User"; // Import your User model

export async function PUT(req: NextRequest) {
  await connectDB(); // Connect to database

  const body = await req.json();
  const { email, firstName, lastName, avatar, newPassword } = body;

  console.log("email is", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.avatar = avatar;

    if (newPassword) {
      user.password = newPassword; // Hash password before saving
    }

    await user.save();
    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
