import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import Review from "@/models/Review";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authOptions";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session?.user?.name) {
      return NextResponse.json(
        { error: "User information not found" },
        { status: 401 }
      );
    }

    const { rating, comment, profession } = await req.json();

    // Create review with sanitized data
    const newReview = await Review.create({
      userEmail: session.user.email,
      userName: session.user.name,
      profession: profession?.trim(),
      rating: Math.round(Number(rating)),
      comment: comment?.trim(),
      createdAt: new Date()
    });

    return NextResponse.json({ 
      message: "Review submitted successfully",
      review: newReview
    }, { status: 201 });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting review:", error.message);
      
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: "Invalid review data", details: error.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const reviews = await Review.find()
      .sort({ rating: -1, createdAt: -1 })
      .limit(4)  // Limit to 4 reviews
      .select('userName profession comment rating _id');  // Include _id field

    return NextResponse.json({ 
      message: "Reviews fetched successfully",
      reviews 
    });
    
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}