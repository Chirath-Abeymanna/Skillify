"use client";
import { useState } from "react";
import workCultures from "@/Data/WorkCulture.json";
import MessageBox from "@/components/MessageBox";

const WORK_CULTURES: string[] = workCultures.map(
  (culture) => culture.company_culture
);

export default function WorkStyleMatcher(): JSX.Element {
  const [selectedWorkStyle, setSelectedWorkStyle] = useState<string>("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedWorkStyle) {
        setMessages([
          ...messages,
          { message: "Select a Work Style first", type: "warning" },
        ]);
        return;
      }
      const selectedCulture = workCultures.find(
        (culture) => culture.company_culture === selectedWorkStyle
      );
      const roles = selectedCulture ? selectedCulture.job_roles : [];
      setJobRoles(roles);
    } catch (error) {
      setMessages([
        ...messages,
        { message: "Error fetching job roles:", type: "error" },
      ]);
      console.error("Error fetching job roles:", error);
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
          src="/images/DeegreeMatcher/bluebg1.jpg"
          alt="New Decorative SVG"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Heading Section */}
        <header className="flex flex-col items-center lg:flex-row lg:items-center pl-4 lg:pl-16 gap-4 pt-6 pb-6">
          <img
            src="/images/DeegreeMatcher/bluebg1.jpg"
            alt="Work Style Icon"
            className="w-24 h-24 lg:w-32 lg:h-32"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-500 drop-shadow-md">
              Work Style Matcher
            </h1>
            <p className="max-w-[600px] text-lg font-semibold text-[#424347] mt-6">
              Discover job roles that match your preferred work style.
            </p>
          </div>
        </header>

        {/* Work Style Selection Form */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative top-10 flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 transition-all transition-duration-1000 ease-in-out"
          >
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold text-[#131313]">
                Select Work Style:
              </label>
              <select
                onChange={(e) => setSelectedWorkStyle(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-gray-50"
              >
                <option value="">Choose work style</option>
                {WORK_CULTURES.map((culture) => (
                  <option key={culture} value={culture}>
                    {culture}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-[#ffffff] border-blue-700 hover:bg-blue-600 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Show Available Job Roles
            </button>
          </form>

          {/* Job Roles List */}
          {jobRoles.length > 0 && (
            <div className="text-center max-w-[800px] mx-auto mt-8 lg:mt-0 lg:ml-8">
              <h2 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                Available Job Roles:
              </h2>
              <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
                <ul>
                  {jobRoles.map((role, idx) => (
                    <li
                      key={idx}
                      className="text-lg font-medium text-[#3c3c3d] p-3 rounded-lg bg-[#e5e6e7] border-[#ffffff] border-2 shadow-md"
                    >
                      {role}
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
