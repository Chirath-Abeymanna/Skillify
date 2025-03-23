import React from "react";
import Spline from "@splinetool/react-spline";

interface GenerateRoadmapUIProps {
  onSubmit: () => void;
  careerGoals: string;
  setCareerGoals: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
  onBack: () => void;
}

const GenerateRoadmapUI: React.FC<GenerateRoadmapUIProps> = ({
  onSubmit,
  careerGoals,
  setCareerGoals,
  skills,
  setSkills,
  onBack,
}) => (
  <div className="w-full flex p-4 lg:p-10 space-x-10">
    <div className="mt-3 w-full lg:w-2/3 justify-center text-lg ">
      <div className="flex flex-wrap mb-5 space-x-10 justify-center lg:justify-start">
        <img src="/images/aboutus/imgFive.svg" className="w-32 h-32" alt="" />
        <h1 className="relative top-10 text-4xl lg:text-6xl font-bold text-center text-sky-400">
          Create New Roadmap
        </h1>
      </div>
      <div className="flex justify-end items-center mb-5">
        <button
          onClick={onBack}
          className="bg-sky-300 text-white px-4 py-4 rounded-lg hover:bg-sky-700"
        >
          Show my Roadmaps
        </button>
      </div>

      <p className="mb-2 text-center lg:text-left">
        A roadmap is your personalized visual blueprint that maps out the key
        steps to unlock your career success.
      </p>
      <p className="mb-6 text-center lg:text-left">
        Tell us about your career goals and your current skill set.
      </p>

      <textarea
        className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your career goals"
        value={careerGoals}
        onChange={(e) => setCareerGoals(e.target.value)}
      />

      <textarea
        className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your current skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <div className="w-[80%] flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          className="bg-blue-500 text-white border-indigo-900 hover:bg-blue-700 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Generate Your Roadmap
        </button>
      </div>
    </div>
    <div className="hidden lg:block w-full lg:w-1/3 h-[80vh] mt-10 ">
      <Spline scene="https://prod.spline.design/ScHW91t89eqdQSaw/scene.splinecode" />
    </div>
  </div>
);

export default GenerateRoadmapUI;
