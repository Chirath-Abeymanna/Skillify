"use client";
import { useState } from "react";
import data from "@/Data/Degrees.json";
import MessageBox from "@/components/MessageBox";

const DEGREE_CATEGORIES: string[] = ["Bio", "Mathematics", "Commerce", "Art"];

//dsvsdofje

export default function DegreeMatcher(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedCategory) {
        setMessages([
          ...messages,
          { message: "Select a Degree Program first", type: "warning" },
        ]);
        return;
      }
      const filteredPrograms = data[selectedCategory as keyof typeof data] || [];
      setRecommendedPrograms(filteredPrograms);
    } catch (error) {
      setMessages([
        ...messages,
        { message: "Error fetching degree programs:", type: "error" },
      ]);
      console.error("Error fetching degree programs:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full m-0 p-0 text-gray-900 font-sans overflow-hidden">
      {/* Message Box */}
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}

      {/* Background Image */}
      <div className="absolute inset-0 -z-5">
        <img
          src="/images/DeegreeMatcher/download.svg"
          alt="New Decorative SVG"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Heading Section */}
        <header className="flex flex-col items-center lg:flex-row lg:items-center pl-4 lg:pl-16 gap-4 pt-6 pb-6">
          <img
            src="/images/DeegreeMatcher/imgThree.svg"
            alt="Degree Icon"
            className="w-24 h-24 lg:w-32 lg:h-32"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-orange-500 drop-shadow-md">
              Degree Navigator
            </h1>
            <p className="max-w-[600px] text-lg font-semibold text-[#424347] mt-6">
              Unlock your potential, discover your strengths, and connect with
              career opportunities.
            </p>
          </div>
        </header>

        {/* Degree Selection Form */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative top-10 flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 transition-all transition-duration-1000 ease-in-out"
          >
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-[#131313]">
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
              className="w-full bg-orange-500 text-[#ffffff] border-orange-700 hover:bg-orange-600 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Show Available Degree Programs
            </button>
          </form>

          {/* Recommended Programs List */}
          {recommendedPrograms.length > 0 && (
            <div className="text-center max-w-[800px] mx-auto mt-8 lg:mt-0 lg:ml-8">
              <h2 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                Recommended Programs:
              </h2>
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
                <ul>
                  {recommendedPrograms.map((prog, idx) => (
                    <li
                      key={idx}
                      className="text-lg font-medium text-[#3c3c3d] p-3 rounded-lg bg-[#e5e6e7] border-[#ffffff] border-2 shadow-md"
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

