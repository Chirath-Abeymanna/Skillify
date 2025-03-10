"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [country, setCountry] = useState("United States");
  const [education, setEducation] = useState("Bachelor’s degree");
  const [experience, setExperience] = useState(3);

  const predictSalary = async () => {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      country,
      education,
      experience,
    });
    alert(`Estimated Salary: $${response.data.salary}`);
  };

  return (
    <div>
      <h1>Salary Prediction</h1>

      <label>Country</label>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {["United States", "India", "United Kingdom", "Germany"].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label>Education Level</label>
      <select value={education} onChange={(e) => setEducation(e.target.value)}>
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

      <label>Years of Experience</label>
      <input
        type="number"
        value={experience}
        onChange={(e) => setExperience(Number(e.target.value))}
      />

      <button onClick={predictSalary}>Predict Salary</button>
    </div>
  );
}
