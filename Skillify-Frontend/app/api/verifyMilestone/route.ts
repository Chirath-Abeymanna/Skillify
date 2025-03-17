import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { milestone } = await req.json();

    if (!milestone) {
      return NextResponse.json(
        { error: "Milestone is required." },
        { status: 400 }
      );
    }

    console.log(`Fetching questions for milestone: "${milestone}"`);

    const prompt = `Generate 5 multiple-choice questions related to "${milestone}". Return only a JSON array with this format:

    [
      {
        "question": "What is ...?",
        "answers": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 2
      }
    ]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    console.log("OpenAI raw response:", response);

    if (!response.choices || response.choices.length === 0) {
      throw new Error("API returned empty choices. Possible rate limit exceeded.");
    }

    const questions = JSON.parse(response.choices[0].message?.content || "[]");

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions", details: error.message },
      { status: 500 }
    );
  }
}
