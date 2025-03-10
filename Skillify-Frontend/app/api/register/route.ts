import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, avatar, reviews, starNo } =
      await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      avatar: avatar || "default", // Ensure avatar is set to default if not provided
      reviews: reviews || [], // Ensure reviews is an empty array if not provided
      starNo: starNo || 0, // Ensure starNo is set to 0 if not provided
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
