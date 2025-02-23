"use client";

import Link from "next/link";
import { useState, useRef } from "react";

interface Job {
  title: string;
  description: string;
  link: string;
}

interface JobCategory {
  [category: string]: Job[];
}

export default function ResumeParser() {
  const [careerPaths, setCareerPaths] = useState<string | null>(null);
  const [jobResults, setJobResults] = useState<JobCategory>({});
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state
  const resultsRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isProcessing) return; // Prevent multiple submissions

    const formData = new FormData();
    const fileInput = document.querySelector<HTMLInputElement>("#pdf_doc");

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a PDF file.");
      return;
    }

    formData.append("pdf_doc", fileInput.files[0]);
    setIsProcessing(true); // Disable button

    try {
      const response = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setCareerPaths(JSON.stringify(result.career_paths, null, 2));
        setJobResults(result.job_results);

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300); // Smooth scroll after rendering
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsProcessing(false); // Enable button after response
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-slate-100">
      {/* Background SVG */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-black/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-400/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern)" />
      </svg>
      {/* Hero Section */}
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-5 sm:pb-32 lg:flex lg:px-8 lg:pt-10 lg:pb-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="flex">
            <img src="/images/aboutus/imgOne.svg" alt="picture" />
            <h1 className="mt-10 ml-5 text-6xl font-bold tracking-tight text-[#0094FF] font-mono sm:text-5xl">
              Job Seeker
            </h1>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-800">
            Add your CV and find the best career opportunities
          </p>

          <div className="mt-10 flex items-center gap-x-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-x-6">
                <input
                  type="file"
                  name="pdf_doc"
                  id="pdf_doc"
                  accept=".pdf"
                  className="drop-shadow-md bg-gray-400/10 font-semibold leading-6 border border-[#71c3f7] py-2 px-4 rounded-2xl block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-[#dbe5ef] file:text-[#258ef7] hover:file:bg-[#aecae6]"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`my-2 px-8 rounded-2xl py-2.5 text-sm font-semibold text-white shadow-sm ${
                    isProcessing
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#2191FF] hover:bg-blue-400/90"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Process"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="mx-auto max-w-2xl sm:object-none sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-5 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl sm:max-w-5xl lg:max-w-none">
            <img
              src="https://res.cloudinary.com/dtsuvx8dz/image/upload/v1716357077/o1imiun4wwcpia9uucgs.gif"
              alt="App screenshot"
              className="w-[25rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div ref={resultsRef} className="w-screen h-full pb-8">
        <div className="flex flex-col justify-center items-center">
          <div>
            <div id="dictionaryValues" className="max-w-7xl p-8">
              {Object.keys(jobResults).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.keys(jobResults).map((category, index) => (
                    <div key={index}>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {category}
                      </h2>
                      {jobResults[category].map(
                        (job: Job, jobIndex: number) => (
                          <div
                            key={jobIndex}
                            className="bg-white text-black rounded-lg shadow-lg p-6 m-5"
                          >
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-400 pb-5">
                              {job.description}
                            </p>
                            <Link
                              href={job.link}
                              target="_blank"
                              className="text-md font-normal text-[#1d7ddc] relative after:absolute after:left-0 after:bottom-[-10px] after:w-0 after:h-[2px] after:bg-[#1d7ddc] after:transition-all after:duration-300 hover:after:w-full"
                            >
                              Apply now
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
