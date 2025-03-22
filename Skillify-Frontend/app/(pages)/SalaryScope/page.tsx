"use client";

import { useState } from "react";
import axios from "axios";

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
    <div className="bg-gray-100 py-20" id="salary-section">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h3 className="text-4xl sm:text-6xl font-bold text-black my-3">
          Salary Prediction
        </h3>
        <h3 className="text-4xl sm:text-6xl font-bold text-black text-opacity-50 lg:mr-48 my-4">
          Salary Prediction
        </h3>
        <h3 className="text-4xl sm:text-6xl font-bold text-black text-opacity-25 lg:-mr-32 my-4">
          Salary Prediction
        </h3>
      </div>

      <div className="flex justify-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-white/30">
          <h1 className="text-3xl font-bold text-black mb-6">
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
                  "Bachelor’s degree",
                  "Master’s degree",
                  "Post grad",
                ].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

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
              className="w-full mt-4 bg-btnblue text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              🔮 Predict Salary
            </button>

            {salary !== null && (
              <div className="mt-4 text-lg font-semibold text-black">
                Estimated Salary:{" "}
                <span className="text-blue-600">${salary}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
