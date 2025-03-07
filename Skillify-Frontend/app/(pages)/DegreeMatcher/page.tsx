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
        