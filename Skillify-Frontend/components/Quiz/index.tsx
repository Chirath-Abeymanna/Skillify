import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface QuizProps {
  milestone: string;
}

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number;
}

const Quiz: React.FC<QuizProps> = ({ milestone }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("roadmapId");

  useEffect(() => {
    document.title = `Quiz: ${decodeURIComponent(milestone)}`;
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await axios.post("/api/verifyMilestone", {
          milestone,
        });
        if (isMounted) {
          setQuestions(response.data.questions);
          setUserAnswers(new Array(response.data.questions.length).fill(-1));
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchQuestions();
    return () => {
      isMounted = false;
    };
  }, [milestone]);

  const handleAnswerChange = useCallback(
    (questionIndex: number, answerIndex: number) => {
      setUserAnswers((prev) => {
        const newUserAnswers = [...prev];
        newUserAnswers[questionIndex] = answerIndex;
        return newUserAnswers;
      });
    },
    []
  );

  const handleSubmit = () => {
    setShowResults(true);
  };

  const answeredCount = userAnswers.filter((answer) => answer !== -1).length;
  const allQuestionsAnswered = answeredCount === questions.length;

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
        Quiz for Milestone: {decodeURIComponent(milestone)}
      </h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          ></div>
        </div>
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
                      <span className="text-gray-700">{answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
            {!showResults && (
              <button
                type="submit"
                className={`mt-6 font-semibold py-2 px-4 rounded transition-all ${
                  allQuestionsAnswered
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!allQuestionsAnswered}
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
            onClick={() => router.push(`/CareerMap?roadmapId=${roadmapId}`)}
            className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Roadmap
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
