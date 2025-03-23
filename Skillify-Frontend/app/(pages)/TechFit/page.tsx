"use client";
import { useState } from "react";
import techStacks from "@/Data/TechStacks.json";
import MessageBox from "@/components/MessageBox";

const TECH_STACKS: string[] = techStacks.map((stack) => stack.tech_stack);

export default function TechStackMatcher(): JSX.Element {
  const [selectedTechStack, setSelectedTechStack] = useState<string>("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedTechStack) {
        setMessages([
          ...messages,
          { message: "Select a Tech Stack first", type: "warning" },
        ]);
        return;
      }
      const selectedStack = techStacks.find(
        (stack) => stack.tech_stack === selectedTechStack
      );
      const roles = selectedStack ? selectedStack.job_roles : [];
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
          src="/images/DeegreeMatcher/bluebg2.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 px-4 md:px-8">
        {/* Heading Section */}
        <header className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-4 pt-6 pb-6">
          <img
            src="/images/DeegreeMatcher/bluebg2.jpg"
            alt="Tech Stack Icon"
            className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-blue-500 drop-shadow-md">
              Tech Stack Matcher
            </h1>
            <p className="max-w-[600px] text-base md:text-lg font-semibold text-[#424347] mt-4">
              Discover job roles that match your tech stack expertise.
            </p>
          </div>
        </header>

        {/* Tech Stack Selection Form */}
        <div className="flex flex-col md:flex-row md:justify-center gap-8 pb-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto p-4 md:p-8 bg-white shadow-2xl rounded-2xl border border-gray-200"
          >
            <div className="flex flex-col w-full">
              <label className="text-base md:text-lg font-semibold text-[#131313]">
                Select Tech Stack:
              </label>
              <select
                onChange={(e) => setSelectedTechStack(e.target.value)}
                className="w-full p-2.5 md:p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-gray-50"
              >
                <option value="">Choose tech stack</option>
                {TECH_STACKS.map((stack) => (
                  <option key={stack} value={stack}>
                    {stack}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-[#ffffff] border-blue-700 hover:bg-blue-600 font-semibold rounded-xl px-4 md:px-6 py-2.5 md:py-3 text-base md:text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Show Available Job Roles
            </button>
          </form>

          {/* Job Roles List */}
          {jobRoles.length > 0 && (
            <div className="w-full md:w-[400px] lg:w-[500px] mx-auto">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 drop-shadow-sm mb-4">
                Available Job Roles:
              </h2>
              <div className="max-h-[300px] overflow-y-auto space-y-3 p-4 md:p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
                <ul className="space-y-2">
                  {jobRoles.map((role, idx) => (
                    <li
                      key={idx}
                      className="text-base md:text-lg font-medium text-[#3c3c3d] p-2.5 md:p-3 rounded-lg bg-[#e5e6e7] border-[#ffffff] border-2 shadow-md"
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
