import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cache = new Map();

export async function POST(req: NextRequest) {
  try {
    const { milestone } = await req.json();

    if (!milestone) {
      return NextResponse.json({ error: "Milestone is required." }, { status: 400 });
    }

    if (cache.has(milestone)) {
      console.log(`Returning cached quiz for milestone: "${milestone}"`);
      return NextResponse.json({ questions: cache.get(milestone) });
    }

    console.log(`Fetching new quiz for milestone: "${milestone}"`);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Generate 5 multiple-choice questions for "${milestone}" in JSON format.` }],
      temperature: 0.7,
    });

    const questions = JSON.parse(response.choices[0].message?.content || "[]");
    cache.set(milestone, questions);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
