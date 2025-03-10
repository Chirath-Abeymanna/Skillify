"use client";

import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { keyframes } from "styled-components";

// Keyframe animation for button hover effect
const buttonHover = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components for an accessible UI
const Container = styled.div`
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff, #e0f7fa);
`;

const Card = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 8px;
  margin-left: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
`;

const Input = styled.input`
  padding: 8px;
  margin-left: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:disabled {
    background-color: #cccccc;
  }
  &:hover {
    background-color: #45a049;
    animation: ${buttonHover} 0.6s ease-in-out;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #007bff;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  color: red;
  font-size: 16px;
`;

const FormSection = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the input */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const InputWrapper = styled.div`
  position: relative;
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
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
      <Card>
        <h1>💼 Salary Prediction</h1>

        <FormSection>
          <Label htmlFor="country">Country</Label>
          <InputWrapper>
            <Select
              id="country"
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
            </Select>
            <Tooltip>Choose your country</Tooltip>
          </InputWrapper>
        </FormSection>

        <FormSection>
          <Label htmlFor="education">Education Level</Label>
          <InputWrapper>
            <Select
              id="education"
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
            <Tooltip>Choose your education level</Tooltip>
          </InputWrapper>
        </FormSection>

        <FormSection>
          <Label htmlFor="experience">Years of Experience</Label>
          <InputWrapper>
            <Input
              id="experience"
              type="number"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
            />
            <Tooltip>Enter your experience in years</Tooltip>
          </InputWrapper>
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
      </Card>
    </Container>
  );
}
