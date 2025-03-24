"use client";

import React from "react";
import { useSession } from "next-auth/react";

const Certificate = ({ roadmapName }: { roadmapName: string }) => {
  const { data: session, status } = useSession();
  const name = session?.user.firstName + " " + session?.user.lastName;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[600px] h-max bg-white border-4 border-blue-500 p-8 shadow-lg text-center relative">
        {/* Logo */}
        <div className="absolute -top-10 left-3 flex items-center space-x-2">
          <img
            src="/images/NavBar/logo.png"
            alt="Skillify Logo"
            className="w-44 h-44"
          />
        </div>

        {/* Certificate Title */}
        <h1 className="text-2xl font-bold mt-16">CERTIFICATE OF ACHIEVEMENT</h1>
        <p className="text-gray-600 mt-2">
          This certificate is proudly presented to
        </p>

        {/* Name Placeholder */}
        <h2 className="text-4xl font-semibold text-blue-600 mt-6">
          {name || "Default user"}
        </h2>

        {/* Description */}
        <p className="text-gray-700 mt-6">
          We certify that this individual has successfully completed the{" "}
          <span className="font-bold text-lg pr-2 ">
            {roadmapName || "Career Guidance"}
          </span>
          roadmap using Skillify, demonstrating dedication and commitment to
          professional growth.
        </p>

        {/* Footer */}
        <p className="mt-10 font-semibold">By the Skillify team</p>
      </div>
    </div>
  );
};

export default Certificate;
