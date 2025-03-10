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
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        country,
        education,
        experience,
      });
      setSalary(response.data.salary);
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>💼 Salary Prediction</h1>

      <div style={{ margin: "10px 0" }}>
        <label>Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ padding: "5px", marginLeft: "10px" }}
        >
          {["United States", "India", "United Kingdom", "Germany"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Education Level</label>
        <select
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          style={{ padding: "5px", marginLeft: "10px" }}
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

      <div style={{ margin: "10px 0" }}>
        <label>Years of Experience</label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          style={{ padding: "5px", marginLeft: "10px" }}
        />
      </div>

      <button
        onClick={predictSalary}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Predict Salary
      </button>

      {salary !== null && (
        <div style={{ marginTop: "15px", fontSize: "18px" }}>
          Estimated Salary: <span style={{ color: "#007BFF" }}>${salary}</span>
        </div>
      )}
    </div>
  );
}
