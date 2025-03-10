"use client";

import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled components for better design
const Container = styled.div`
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 5px;
  margin-left: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 16px;
  &:disabled {
    background-color: #ccc;
  }
`;

const Result = styled.div`
  margin-top: 15px;
  font-size: 18px;
  color: #007bff;
`;

const ErrorMessage = styled.div`
  margin-top: 15px;
  color: red;
  font-size: 16px;
`;

const FormSection = styled.div`
  margin-bottom: 15px;
`;

export default function Home() {
  const [country, setCountry] = useState("United States");
  const [education, setEducation] = useState("Bachelor’s degree");
  const [experience, setExperience] = useState(3);
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const validateForm = () => {
    return country && education && experience > 0;
  };

  const predictSalary = async () => {
    if (!validateForm()) {
      setIsValid(false);
      return;
    }

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
    <Container>
      <h1>💼 Salary Prediction</h1>

      <FormSection>
        <Label>Country</Label>
        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
          {["United States", "India", "United Kingdom", "Germany"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </FormSection>

      <FormSection>
        <Label>Education Level</Label>
        <Select
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
        </Select>
      </FormSection>

      <FormSection>
        <Label>Years of Experience</Label>
        <Input
          type="number"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
        />
      </FormSection>

      <Button onClick={predictSalary} disabled={loading}>
        {loading ? "Predicting..." : "Predict Salary"}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {salary !== null && !loading && (
        <Result>Estimated Salary: ${salary}</Result>
      )}
      {!isValid && (
        <ErrorMessage>Please fill out all fields correctly.</ErrorMessage>
      )}
    </Container>
  );
}
