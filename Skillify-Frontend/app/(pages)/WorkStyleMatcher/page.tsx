"use client";

import { useState } from "react";

const WorkStyleMatcher: React.FC = () => {
  const questions = [
    { id: 1, text: "I prefer working in a team rather than alone." },
    { id: 2, text: "I enjoy taking the lead on projects." },
    { id: 3, text: "I like having a structured and organized work environment." },
    { id: 4, text: "I am comfortable with taking risks at work." },
  ];

  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [result, setResult] = useState<string | null>(null);

  const handleResponseChange = (index: number, value: number) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const calculateWorkStyle = () => {
    const totalScore = responses.reduce((sum, response) => sum + response, 0);
    if (totalScore <= 5) {
      setResult("You prefer a collaborative and structured work style.");
    } else if (totalScore <= 10) {
      setResult("You thrive in a balanced and flexible work environment.");
    } else {
      setResult("You excel in independent and dynamic work settings.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        Work Style Matcher
      </h1>
      <p className="text-lg text-center mb-4">
        Answer the following questions to discover your ideal work style.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateWorkStyle();
        }}
        className="space-y-6"
      >
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-2">
            <p className="text-lg">{question.text}</p>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex flex-col items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={value}
                    checked={responses[index] === value}
                    onChange={() => handleResponseChange(index, value)}
                    className="hidden"
                  />
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
                      responses[index] === value
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {value}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full text-lg sm:text-xl text-white font-semibold text-center rounded-xl bg-blue-600 hover:bg-blue-700 py-3 transition-all"
        >
          Get My Work Style
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-xl font-bold">Your Work Style:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default WorkStyleMatcher;
