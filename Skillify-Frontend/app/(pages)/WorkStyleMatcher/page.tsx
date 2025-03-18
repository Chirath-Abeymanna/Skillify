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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedWorkStyle) return;
    setLoading(true);
    setTimeout(() => {
      try {
        const selectedCulture = workCultures.find(
          (culture) => culture.company_culture === selectedWorkStyle
        );
        setJobRoles(selectedCulture ? selectedCulture.job_roles : []);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: "Error fetching job roles", type: "error" },
        ]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [selectedWorkStyle]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedWorkStyle) {
      setMessages((prevMessages) =>
        prevMessages.some((msg) => msg.message === "Select a Work Style first")
          ? prevMessages
          : [...prevMessages, { message: "Select a Work Style first", type: "warning" }]
      );
      return;
    }
  };

  return (
    <div className="relative min-h-screen w-full text-gray-900 font-sans overflow-hidden">
      {/* Message Box */}
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}

      {/* Background Image */}
      <div className="absolute inset-0 -z-5">
        <img
          src="/images/DeegreeMatcher/bluebg1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10">
        {/* Heading Section */}
        <header className="flex flex-col items-center lg:flex-row lg:items-center pl-4 lg:pl-16 gap-4 pt-6 pb-6">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-blue-500 drop-shadow-md">
            Work Style Matcher
          </h1>
          <p className="max-w-[600px] text-lg font-semibold text-[#424347] mt-6">
            Discover job roles that match your preferred work style.
          </p>
        </header>

        {/* Work Style Selection Form */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-200"
          >
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

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300"
            >
              Show Available Job Roles
            </button>
          </form>

          {/* Job Roles List */}
          {loading ? (
            <div className="text-center mt-8 text-lg font-semibold text-blue-600">
              Loading job roles...
            </div>
          ) : (
            jobRoles.length > 0 && (
              <div className="text-center max-w-[800px] mx-auto mt-8 lg:mt-0 lg:ml-8">
                <h2 className="text-2xl font-bold text-gray-800 drop-shadow-sm">
                  Available Job Roles:
                </h2>
                <div className="mt-4 max-h-[300px] overflow-y-auto space-y-4 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
                  <ul>
                    {jobRoles.map((role, idx) => (
                      <li
                        key={idx}
                        className="text-lg font-medium text-[#3c3c3d] p-3 rounded-lg bg-[#e5e6e7] border-2 shadow-md hover:bg-gray-200 transition duration-300"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}