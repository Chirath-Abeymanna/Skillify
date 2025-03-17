import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackQuestions = [
  {
    question: "What is a milestone?",
    answers: ["A goal", "A rock", "A measurement", "A tool"],
    correctAnswer: 0,
  },
  {
    question: "Why are milestones important?",
    answers: ["They track progress", "They slow down work", "They replace deadlines", "They are unnecessary"],
    correctAnswer: 0,
  },
];

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

    const prompt = `Generate 5 multiple-choice questions related to "${milestone}". Format the response as JSON with this structure:

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

    let questions;
    try {
      questions = JSON.parse(response.choices[0].message?.content || "[]");
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Invalid AI response format");
      }
    } catch (err) {
      console.error("Error parsing AI response, using fallback questions:", err);
      questions = fallbackQuestions;
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions", fallbackUsed: true },
      { status: 500 }
    );
  }
}
