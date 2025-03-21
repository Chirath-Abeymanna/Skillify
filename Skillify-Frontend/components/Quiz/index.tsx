import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Roadmap from "../Roadmap"; // Import the Roadmap component

interface Milestone {
  milestoneName: string;
  milestoneDescription: string;
  searchQuery: string;
  milestoneLink?: string;
  roadmap: string;
}

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const Quiz: React.FC<{
  milestone: Milestone | null;
  onQuizComplete: () => void;
}> = ({ milestone, onQuizComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showRoadmap, setShowRoadmap] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [colors, setColors] = useState({
    backgroundColor: "",
    milestoneColor: "",
    roadColor: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("roadmapId");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post("/api/verifyMilestone", {
          milestone: milestone?.milestoneName,
        });
        setQuestions(response.data.questions);
        setUserAnswers(new Array(response.data.questions.length).fill(-1));
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [milestone]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleBackToRoadmap = async () => {
    if (milestone) {
      try {
        await axios.post("/api/updateMilestoneStatus", {
          milestoneName: milestone.milestoneName,
          completed: true,
        });

        const response = await axios.get(
          `/api/getRoadmap?roadmapId=${milestone.roadmap}`
        );
        const data = response.data;
        setRoadmap(data);
        setColors({
          backgroundColor: data.backgroundColor,
          milestoneColor: data.milestoneColor,
          roadColor: data.roadColor,
        });
      } catch (error) {
        console.error("Error updating milestone status:", error);
      }
    }
    setShowRoadmap(true);
    onQuizComplete(); // Notify parent component to switch back to roadmap
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!milestone) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      {!showRoadmap ? (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            Quiz for Milestone: {decodeURIComponent(milestone.milestoneName)}
          </h1>
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            {questions.length > 0 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-6">
                    <p className="text-gray-700 mb-2">{question.question}</p>
                    {question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className="mb-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={answerIndex}
                            checked={userAnswers[questionIndex] === answerIndex}
                            onChange={() =>
                              handleAnswerChange(questionIndex, answerIndex)
                            }
                            className="mr-2"
                            disabled={showResults}
                          />
                          <span
                            className={`${
                              showResults
                                ? answerIndex === question.correctAnswer
                                  ? "text-green-500"
                                  : userAnswers[questionIndex] === answerIndex
                                  ? "text-red-500"
                                  : "text-gray-700"
                                : "text-gray-700"
                            }`}
                          >
                            {answer}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                {!showResults && (
                  <button
                    type="submit"
                    className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                )}
              </form>
            ) : (
              <p className="text-gray-700">No questions available.</p>
            )}
            {showResults && (
              <button
                onClick={handleBackToRoadmap}
                className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
              >
                Back to Roadmap
              </button>
            )}
          </div>
        </>
      ) : (
        <Roadmap roadmap={roadmap.milestones} colors={colors} />
      )}
    </div>
  );
};

export default Quiz;
