"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Spline from "@splinetool/react-spline";
import Roadmap from "../../../components/Roadmap";

const CareerMapPage: React.FC = () => {
  const { data: session } = useSession();
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [careerGoals, setCareerGoals] = useState("");
  const [skills, setSkills] = useState("");
  interface Milestone {
    milestoneName: string;
    description: string;
    searchQuery: string;
  }

  const [roadmap, setRoadmap] = useState<Milestone[]>([]);

  const submit = async () => {
    console.log("Career Map Submitted");
    console.log("Career Goals:", careerGoals);
    console.log("Skills:", skills);

    try {
      const response = await fetch("/api/generateRoadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ careerGoals, skills }),
      });

      const data = await response.json();
      console.log("Roadmap data:", data);
      setRoadmap(data.roadmap);
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-Poppins">
        <p className="text-lg">Please sign in to view your career map.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-Poppins">
      {!showRoadmap && (
        <>
          <div className="w-full lg:w-2/3 flex flex-col p-4 lg:p-10">
            <div className="mt-3 w-full justify-center text-lg">
              <div className="flex flex-wrap mb-10 space-x-10 justify-center lg:justify-start">
                <img
                  src="/images/aboutus/imgFive.svg"
                  className="w-32 h-32"
                  alt=""
                />
                <h1 className="relative top-10 text-4xl lg:text-6xl font-bold text-center text-sky-400">
                  Career Map
                </h1>
              </div>

              <p className="mb-2 text-center lg:text-left">
                A roadmap is your personalized visual blueprint that maps out
                the key steps to unlock your career success.
              </p>
              <p className="mb-6 text-center lg:text-left">
                Tell us about your career goals and your current skill set.
              </p>

              <textarea
                className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your career goals"
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
              />

              <textarea
                className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your current skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <div className="w-[80%] flex justify-center">
                <button
                  type="button"
                  onClick={submit}
                  className="bg-blue-500 text-white border-indigo-900 hover:bg-blue-700 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Generate Your Roadmap
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center lg:w-2/4 h-screen">
            <div>
              <Spline scene="https://prod.spline.design/AxO7FIBoaQOM0Hr2/scene.splinecode" />
            </div>
          </div>
        </>
      )}
      {/* {showRoadmap && (
        <div className="w-full flex flex-col items-center mt-10">
          <h2 className="text-3xl font-bold mb-6">Your Career Roadmap</h2>
          <div className="w-[80%] bg-white p-4 rounded-lg shadow-lg">
            {roadmap.map((milestone, index) => (
              <div key={index} className="mb-6 p-4 border-b border-gray-300">
                <h3 className="text-xl font-semibold text-blue-600">
                  {milestone.milestoneName}
                </h3>
                <p className="text-gray-700">{milestone.description}</p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    milestone.searchQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  Search for courses
                </a>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default CareerMapPage;
