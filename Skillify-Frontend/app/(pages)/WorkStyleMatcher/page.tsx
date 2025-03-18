"use client";
import { useState } from "react";
import workCultures from "@/Data/WorkCulture.json";

const WORK_CULTURES: string[] = workCultures.map(
  (culture) => culture.company_culture
);

export default function WorkStyleMatcher(): JSX.Element {
  const [selectedWorkStyle, setSelectedWorkStyle] = useState<string>("");

  return (
    <div className="relative min-h-screen w-full text-gray-900 font-sans overflow-hidden">
      <div className="relative z-10">
        <header className="flex flex-col items-center lg:flex-row lg:items-center pl-4 lg:pl-16 gap-4 pt-6 pb-6">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-500 drop-shadow-md">
            Work Style Matcher
          </h1>
        </header>
        
        {/* Work Style Selection Dropdown */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <div className="relative flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-[#131313]">
                Select Work Style:
              </label>
              <select
                aria-label="Select Work Style"
                onChange={(e) => setSelectedWorkStyle(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50"
              >
                <option value="">Choose work style</option>
                {WORK_CULTURES.map((culture) => (
                  <option key={culture} value={culture}>
                    {culture}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
