import React from "react";

const CareerMapPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white">
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
        className="w-full md:w-1/2 h-32 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write here..."
      />

    </div>
  );
};

export default CareerMapPage;