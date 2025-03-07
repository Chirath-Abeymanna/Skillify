"use client";
import { useState } from "react";
import data from "@/Data/Degrees.json";

const DEGREE_CATEGORIES: string[] = ["Bio", "Mathematics", "Commerce", "Art"];

export default function DegreeMatcher(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedCategory) {
        throw new Error("Please select a degree category.");
      }
      const filteredPrograms =
        data[selectedCategory as keyof typeof data] || [];
      setRecommendedPrograms(filteredPrograms);
    } catch (error) {
      console.error("Error fetching degree programs:", error);
    }
  };
  
  return (
    <div className="relative min-h-screen w-full p-0 m-0 text-gray-900 font-sans">
      {/* Background Container */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/DeegreeMatcher/blue-gradient-strokes-white-background.jpg')",
        }}
      ></div>

      <div className="relative z-10">
        {/* Heading Section */}
        <header className="mt-12 mb-8 flex pt-10 items-center pl-16 gap-4">
          <img
            src="/images/DeegreeMatcher/imgThree.svg" // update this path if needed
            alt="Degree Icon"
            className="relative bottom-8 w-32 h-32"
          />
          <div>
            <h1 className="text-5xl font-extrabold text-orange-500 drop-shadow-md">
              Degree Matcher
            </h1>
            <p className="max-w-[600px] text-lg text-gray-600 mt-10">
              Unlock your potential, discover your strengths, and connect with career opportunities.
            </p>
          </div>
        </header>

        {/* Degree Selection Form */}
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            className="relative top-10 flex flex-col items-center gap-6 lg:w-[600px] lg:h-[250px] mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 transition-all transition-duration-1000 ease-in-out"
          >
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-[#1e3a8a]">
                Select Degree Category:
              </label>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-gray-50"
              >
                <option value="">Choose category</option>
                {DEGREE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white border-orange-700 hover:bg-orange-600 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Get Degree Programs
            </button>
          </form>

          {/* Recommended Programs List */}
          {recommendedPrograms.length > 0 && (
            <div className="text-center max-w-[800px] mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                Recommended Programs:
              </h2>
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
                <ul>
                  {recommendedPrograms.map((prog, idx) => (
                    <li
                      key={idx}
                      className="text-lg font-medium text-[#1e3a8a] p-3 rounded-lg bg-[#ddf0f6] border-[#eaeff5] border-2 shadow-md space-y-10 m-5"
                    >
                      {prog}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

        