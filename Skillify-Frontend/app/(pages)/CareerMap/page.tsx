import React from "react";

const CareerMapPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("/images/CareerMap/vecteezy_grey-color-gradient-background-vector_26424612.svg")',
      }}
    >
      {/* Left 3/4 Section */}
      <div className="w-3/4 flex flex-col items-center justify-center px-16 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Create your Custom Roadmap
        </h1>

        <p className="mb-2 text-center">
          A roadmap is your personalized visual blueprint that maps out the key steps to unlock your career success.
        </p>
        <p className="mb-6 text-center">
          Tell us about your career goals and your current skill set.
        </p>

        <textarea
          className="w-full md:w-3/4 h-32 border border-gray-300 rounded p-2 mb-4 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write here..."
        />

        {/* Minimized Button (no w-full) */}
        <button
          type="submit"
          className="bg-blue text-white border-indigo-900 hover:bg-indigo-700
                     font-semibold rounded-xl px-6 py-3 text-lg shadow-md 
                     transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Generate you&apos;re Roadmap
        </button>
      </div>

      {/* Right 1/4 Blank Section */}
      <div className="w-1/4" />
    </div>
  );
};

export default CareerMapPage;
