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

    </div>
  );
};

export default CareerMapPage;