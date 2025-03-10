"use client";

import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-500 py-16 px-6 lg:px-20 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-100">
        <h1 className="text-5xl font-extrabold text-indigo-700 text-center mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center mb-8 italic">
          Last updated: March 10, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            🚀 1. Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to Skillify! We are thrilled to have you here. These terms
            outline the rules for using our amazing platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            🔹 2. User Responsibilities
          </h2>
          <p className="text-gray-700">
            By using our website, you agree to be kind, respectful, and follow
            all applicable laws. Let's keep Skillify a great place for everyone!
            😊
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
