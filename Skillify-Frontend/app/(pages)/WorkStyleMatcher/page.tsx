"use client";
import { useState, useEffect } from "react";
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

  // Extract job roles when selectedWorkStyle changes
  useEffect(() => {
    if (!selectedWorkStyle) return; // Skip if no work style is selected

    const selectedCulture = workCultures.find(
      (culture) => culture.company_culture === selectedWorkStyle
    );
    
    setJobRoles(selectedCulture ? selectedCulture.job_roles : []);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: "Work Style selected successfully!", type: "success" },
    ]);
  }, [selectedWorkStyle]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedWorkStyle) {
      setMessages((prevMessages) => {
        // Check if the warning message already exists
        if (prevMessages.some((msg) => msg.message === "Select a Work Style first")) {
          return prevMessages;
        }
        return [
          ...prevMessages,
          { message: "Select a Work Style first", type: "warning" },
        ];
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full text-gray-900 font-sans overflow-hidden">
      {/* Message Box */}
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}

      {/* Heading Section */}
      <div className="text-center py-10 bg-blue-500 text-white">
        <h1
          className="text-4xl lg:text-5xl font-extrabold drop-shadow-md"
          role="heading"
          aria-level={1}
        >
          Work Style Matcher
        </h1>
        <p className="mt-4 text-lg" aria-live="polite">
          Choose your preferred work style and discover the best job roles that align with it. 
          Take the first step towards finding your ideal work environment!
        </p>
      </div>

      <div className="relative z-10">
        {/* Work Style Selection Form */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200"
            aria-labelledby="workstyle-form"
            role="form"
          >
            <div className="flex flex-col w-full">
              <label
                htmlFor="workstyle-select"
                className="text-lg font-semibold text-[#131313] mb-2"
              >
                Select Work Style:
              </label>
              <select
                id="workstyle-select"
                aria-label="Select a work style from the dropdown"
                aria-required="true"
                onChange={(e) => setSelectedWorkStyle(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50 transition duration-300 hover:border-blue-400"
                aria-invalid={selectedWorkStyle === "" ? "true" : "false"}
                required
              >
                <option value="" aria-placeholder="Select a work style">
                  Choose work style
                </option>
                {WORK_CULTURES.map((culture, idx) => (
                  <option key={idx} value={culture}>
                    {culture}
                  </option>
                ))}
              </select>
              <span
                role="alert"
                className="text-sm text-red-500 mt-1"
                aria-live="assertive"
              >
                {selectedWorkStyle === "" && "Please select a work style"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform transition duration-300 ease-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none"
              aria-live="assertive"
              aria-disabled={selectedWorkStyle === "" ? "true" : "false"}
            >
              Show Available Job Roles
            </button>
          </form>
        </div>

        {/* Job Roles List */}
        {jobRoles.length > 0 && (
          <div
            className="text-center max-w-[800px] mx-auto mt-8"
            role="region"
            aria-labelledby="available-job-roles"
          >
            <h2
              id="available-job-roles"
              className="text-2xl font-bold text-gray-800 drop-shadow-sm"
            >
              Available Job Roles:
            </h2>
            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
              <ul role="list">
                {jobRoles.map((role, idx) => (
                  <li
                    key={idx}
                    className="text-lg font-medium text-[#3c3c3d] p-3 rounded-lg bg-[#e5e6e7] border-2 shadow-md hover:bg-gray-200 transition duration-300"
                    role="listitem"
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
  );
}
