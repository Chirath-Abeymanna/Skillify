import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/databaseClient";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const roadmapId = searchParams.get("roadmapId");

    if (!roadmapId) {
      return NextResponse.json(
        { error: "Roadmap ID is required" },
        { status: 400 }
      );
    }

    client = await connectDB();
    const db = client.db();

    const result = await db
      .collection("roadmaps")
      .deleteOne({ _id: new ObjectId(roadmapId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Roadmap deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    return NextResponse.json(
      { error: "Failed to delete roadmap" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
