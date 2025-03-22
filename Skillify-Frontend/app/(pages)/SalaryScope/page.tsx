"use client";

import { useState } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [country, setCountry] = useState("United States");
  const [education, setEducation] = useState("Bachelor’s degree");
  const [experience, setExperience] = useState(3);
  const [salary, setSalary] = useState(null);

  const predictSalary = async () => {
    try {
      const response = await axios.post(
        "https://skillify-flask-production.up.railway.app/predict",
        {
          country,
          education,
          experience,
        }
      );
      setSalary(response.data.salary);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Spline Scene */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/hCUURNgyO6FmEuiS/scene.splinecode" />
        </div>
      </div>

      {/* Right Side - Salary Prediction */}
      <div className="w-full md:w-1/2 min-h-[60vh] md:h-screen bg-gray-100 py-10 md:py-20 px-4 md:px-6 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          {/* Stacked Text Effect */}
          <div className="text-center mb-10">
            <h3 className="text-4xl sm:text-5xl font-bold text-black">
              Salary Prediction
            </h3>
            <h3 className="text-4xl sm:text-5xl font-bold text-black text-opacity-50 mt-2">
              Salary Prediction
            </h3>
            <h3 className="text-4xl sm:text-5xl font-bold text-black text-opacity-25 mt-2">
              Salary Prediction
            </h3>
          </div>

          {/* Prediction Form */}
          <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-10 w-full text-center border border-white/30">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
              💼 Predict Your Salary
            </h1>

            <div className="space-y-4">
              <div className="text-left">
                <label className="block text-black font-medium">Country</label>
                <select
                  className="w-full mt-1 p-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-md border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {["United States", "India", "United Kingdom", "Germany"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Education Level Select */}
              <div className="text-left">
                <label className="block text-black font-medium">
                  Education Level
                </label>
                <select
                  className="w-full mt-1 p-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-md border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                >
                  {[
                    "Less than a Bachelors",
                    "Bachelor's degree",
                    "Master's degree",
                    "Post grad",
                  ].map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Input */}
              <div className="text-left">
                <label className="block text-black font-medium">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-md border border-gray-300 text-black focus:ring-2 focus:ring-blue-500"
                  value={experience}
                  onChange={(e) => setExperience(Number(e.target.value))}
                />
              </div>

              <button
                onClick={predictSalary}
                className="w-full mt-6 bg-btnblue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                🔮 Predict Salary
              </button>

              {salary !== null && (
                <div className="mt-6 text-lg font-semibold text-black">
                  Estimated Salary:{" "}
                  <span className="text-blue-600">${salary}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
