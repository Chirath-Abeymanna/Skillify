import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your .env file
});

const SERPER_API_KEY = process.env.SERPER_API_KEY; // Ensure you have this in your .env file

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
    generate a name for the roadmap and identify the missing skills needed to achieve this goal.
    Provide the response as an object with the following properties:
    - roadmapName: A concise name for the roadmap.
    - milestones: An array of milestones, where each milestone includes:
      - milestoneName: A concise name for the milestone.
      - milestoneDescription: A short explanation of why this skill is needed.
      - searchQuery: A relevant search query to find online courses.

    Return the response as a JSON object.
    `;

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

    let roadmapData;
    try {
      roadmapData = JSON.parse(messageContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return NextResponse.json(
        { error: "Failed to parse roadmap JSON" },
        { status: 500 }
      );
    }

    // Fetch course links using Serper API
    for (let milestone of roadmapData.milestones) {
      const searchQuery = milestone.searchQuery;

      const serperResponse = await axios.post(
        "https://google.serper.dev/search",
        {
          q: searchQuery,
          gl: "lk", // Sri Lanka
          hl: "en", // English
        },
        {
          headers: {
            "X-API-KEY": SERPER_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (serperResponse.status === 200 && serperResponse.data.organic) {
        milestone.milestoneLink =
          serperResponse.data.organic[0]?.link || "No Link Found";
      } else {
        milestone.milestoneLink = "No Link Found";
      }
    }

    return NextResponse.json(roadmapData);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
