import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
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

    console.log("Generating quiz for milestone:", milestone);

    const prompt = `Generate 5 multiple-choice questions for the milestone: "${milestone}". Provide the response in a strict JSON array format, following this structure:

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

    if (!response.choices || response.choices.length === 0) {
      throw new Error("OpenAI returned an empty response");
    }

    const messageContent = response.choices[0].message?.content?.trim();
    if (!messageContent) {
      throw new Error("Invalid response from OpenAI");
    }

    const questions = JSON.parse(messageContent);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions", details: error.message },
      { status: 500 }
    );
  }
}
