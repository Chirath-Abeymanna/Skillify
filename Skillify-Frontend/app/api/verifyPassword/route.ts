import { getToken } from "next-auth/jwt";
import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// Handle POST request for password verification
export async function POST(req: Request) {
  const { currentPassword, email } = await req.json(); // Extract the email and password from request body

  console.log("currentPassword", currentPassword);
  console.log("email", email);

  // Connect to the database
  await connectDB();

  try {
    const db_user = await User.findOne({ email });
    if (!db_user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const storedHashedPassword = db_user.password;
    const isMatch = await bcrypt.compare(currentPassword, storedHashedPassword);

    if (isMatch) {
      return NextResponse.json(
        { message: "Password verified" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
