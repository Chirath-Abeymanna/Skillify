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
      const filteredPrograms =
        data[selectedCategory as keyof typeof data] || [];
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
    <div className="relative min-h-screen w-full m-0 p-0 text-gray-900 font-sans overflow-x-hidden">
      {/* Message Box */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {messages.map((msg, index) => (
          <MessageBox key={index} message={msg.message} type={msg.type} />
        ))}
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-5">
        <img
          src="/images/DeegreeMatcher/bgblue.jpg"
          alt="New Decorative SVG"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 px-4 md:px-8">
        {/* Heading Section */}
        <header className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-4 pt-6 pb-6">
          <img
            src="/images/aboutus/imgsix.svg"
            alt="Degree Icon"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-blue-600 drop-shadow-md">
              Degree Navigator
            </h1>
            <p className="max-w-[600px] text-base md:text-lg font-semibold text-[#424347] mt-4">
              Unlock your potential, discover your strengths, and connect with
              career opportunities.
            </p>
          </div>
        </header>

        {/* Degree Selection Form */}
        <div className="flex flex-col md:flex-row md:justify-center gap-8 pb-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-blue-100"
          >
            <div className="flex flex-col w-full">
              <label className="text-base md:text-lg font-semibold text-[#131313]">
                Select Degree Category:
              </label>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 md:p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-gray-50"
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
              className="w-full mt-6 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 font-semibold rounded-xl px-4 md:px-6 py-2.5 md:py-3 text-base md:text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Show Available Degree Programs
            </button>
          </form>

          {/* Recommended Programs List */}
          {recommendedPrograms.length > 0 && (
            <div className="w-full md:w-[400px] lg:w-[500px] mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-blue-600 drop-shadow-sm mb-4">
                Recommended Programs:
              </h2>
              <div className="max-h-[300px] overflow-y-auto space-y-3 p-4 md:p-6 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-blue-100">
                <ul className="space-y-2">
                  {recommendedPrograms.map((prog, idx) => (
                    <li
                      key={idx}
                      className="text-base md:text-lg font-medium text-[#3c3c3d] p-2.5 md:p-3 rounded-lg bg-blue-50 border-blue-100 border-2 shadow-md hover:bg-blue-100 transition-colors"
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
