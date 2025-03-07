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
        