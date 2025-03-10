import React from "react";

const CareerMapPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-Poppins">
      {/* Left Section */}
      <div className="w-full lg:w-3/4 flex flex-col p-4 lg:p-10">
        <div className="mt-5 w-full">
          <div className="flex flex-wrap mb-10 space-x-10 justify-center lg:justify-start">
            <img
              src="/images/aboutus/imgFive.svg"
              className="w-32 h-32"
              alt=""
            />
            <h1 className="relative top-10 text-4xl lg:text-6xl font-bold text-center text-sky-400">
              Career Map
            </h1>
          </div>

          <p className="mb-2 text-center lg:text-left">
            A roadmap is your personalized visual blueprint that maps out the
            key steps to unlock your career success.
          </p>
          <p className="mb-6 text-center lg:text-left">
            Tell us about your career goals and your current skill set.
          </p>

          <textarea
            className="w-[70%] h-48 border border-gray-300 rounded p-2 mb-4 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter you're Goals here"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue text-white border-indigo-900 hover:bg-indigo-700
                     font-semibold rounded-xl px-6 py-3 text-lg shadow-md 
                     transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Generate you&apos;re Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Right Blank Section (hidden on mobile and tablet) */}
      <div className="hidden lg:block lg:w-1/4" />
    </div>
  );
};

export default CareerMapPage;
