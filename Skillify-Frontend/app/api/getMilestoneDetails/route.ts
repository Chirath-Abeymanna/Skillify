import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/databaseClient";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const milestoneIds = searchParams.get("milestoneIds")?.split(",");

    if (!milestoneIds) {
      return NextResponse.json(
        { error: "Milestone IDs are required" },
        { status: 400 }
      );
    }

    client = await connectDB();
    const db = client.db();

    const objectIds = milestoneIds.map((id) => new ObjectId(id));
    const milestones = await db
      .collection("milestones")
      .find({ _id: { $in: objectIds } })
      .toArray();

    return NextResponse.json({ milestones }, { status: 200 });
  } catch (error) {
    console.error("Error fetching milestone details:", error);
    return NextResponse.json(
      { error: "Failed to fetch milestone details" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
