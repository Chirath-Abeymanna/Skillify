import React from "react";

const Certificate = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[800px] h-[600px] bg-white border-4 border-blue-500 p-8 shadow-lg text-center relative">
        {/* Logo */}
        <div className="absolute top-6 left-6 flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Skillify Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold text-blue-600">SKILLIFY</span>
        </div>

        {/* Certificate Title */}
        <h1 className="text-2xl font-bold mt-16">CERTIFICATE OF ACHIEVEMENT</h1>
        <p className="text-gray-600 mt-2">This certificate is proudly presented to</p>

        {/* Name Placeholder */}
        <h2 className="text-4xl font-semibold text-blue-600 mt-6">Name Surname</h2>

        {/* Description */}
        <p className="text-gray-700 mt-6">
          We certify that this user has successfully generated <br />
          a certificate using Skillify. If you like, you can <br />
          generate your own certificates using Skillify.
        </p>

        {/* Footer */}
        <p className="mt-10 font-semibold">By the Skillify team</p>
      </div>
    </div>
  );
};

export default Certificate;
