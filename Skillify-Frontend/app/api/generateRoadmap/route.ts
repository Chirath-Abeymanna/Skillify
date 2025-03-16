import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your .env file
});

export async function POST(req: NextRequest) {
  try {
    const { careerGoals, skills } = await req.json();

    console.log("Career goals:", careerGoals);
    console.log("Current skills:", skills);

    if (!careerGoals || !skills) {
      return NextResponse.json(
        { error: "Career goals and current skills are required." },
        { status: 400 }
      );
    }

    const prompt = `
    Based on the following career goals: "${careerGoals}"
    and the current skill set: "${skills}", 
    identify the missing skills needed to achieve this goal.
    Provide the response as an array of milestones, where each milestone includes:
    - milestoneName: A concise name for the milestone.
    - description: A short explanation of why this skill is needed.
    - searchQuery: A relevant search query to find online courses.

    Return the response as a JSON array without extra explanations.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
    });

    const roadmap = JSON.parse(response.choices[0].message.content || "[]");

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
