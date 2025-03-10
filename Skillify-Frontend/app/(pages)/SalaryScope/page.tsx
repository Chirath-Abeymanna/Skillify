"use client";

import { useState } from "react";
import axios from "axios";

// Component for selecting a country
const CountrySelect = ({ country, setCountry }) => (
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
);

// Component for selecting education level
const EducationSelect = ({ education, setEducation }) => (
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
);

// Component for entering years of experience
const ExperienceInput = ({ experience, setExperience }) => (
  <div style={{ margin: "10px 0" }}>
    <label>Years of Experience</label>
    <input
      type="number"
      value={experience}
      onChange={(e) => setExperience(Number(e.target.value))}
      style={{ padding: "5px", marginLeft: "10px" }}
    />
  </div>
);

// Main component for Salary Prediction
export default function Home() {
  const [country, setCountry] = useState("United States");
  const [education, setEducation] = useState("Bachelor’s degree");
  const [experience, setExperience] = useState(3);
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictSalary = async () => {
    setLoading(true);
    setError(null); // Reset error before making the request
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        country,
        education,
        experience,
      });
      setSalary(response.data.salary);
    } catch (error) {
      setError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>💼 Salary Prediction</h1>

      <CountrySelect country={country} setCountry={setCountry} />
      <EducationSelect education={education} setEducation={setEducation} />
      <ExperienceInput experience={experience} setExperience={setExperience} />

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
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict Salary"}
      </button>

      {error && <div style={{ marginTop: "15px", color: "red" }}>{error}</div>}

      {salary !== null && !loading && (
        <div style={{ marginTop: "15px", fontSize: "18px" }}>
          Estimated Salary: <span style={{ color: "#007BFF" }}>${salary}</span>
        </div>
      )}
    </div>
  );
}
