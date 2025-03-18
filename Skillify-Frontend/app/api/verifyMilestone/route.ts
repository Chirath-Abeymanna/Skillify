import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your .env file
});

export async function POST(req: NextRequest) {
  try {
    const { milestone } = await req.json();

    console.log("Milestone:", milestone);

    if (!milestone) {
      return NextResponse.json(
        { error: "Milestone is required." },
        { status: 400 }
      );
    }

    const prompt = `Generate 5 multiple-choice questions based on the milestone: ${milestone}. Each question should have 4 answers, and one of them should be correct. Provide the response as a JSON array of objects with the following properties:
    - question: The question text.
    - answers: An array of 4 answer options.
    - correctAnswer: The index of the correct answer (0-3). Ensure the JSON is properly formatted and follows this exact structure:
    [
      {
        "question": "string",
        "answers": ["string", "string", "string", "string"],
        "correctAnswer": number
      },
      ...
    ]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
    });

    const messageContent = response.choices[0]?.message?.content?.trim();
    if (!messageContent) {
      return NextResponse.json(
        { error: "Failed to get a valid response from OpenAI" },
        { status: 500 }
      );
    }

    const questions = JSON.parse(messageContent);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}