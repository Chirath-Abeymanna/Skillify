import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post("/api/verifyMilestone", {
          milestone,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz for Milestone: {decodeURIComponent(milestone)}</h1>
      {questions.length > 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {questions.map((q, qIndex) => (
            <div key={qIndex}>
              <p>{q.question}</p>
              {q.answers.map((answer, aIndex) => (
                <label key={aIndex}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={aIndex}
                    checked={userAnswers[qIndex] === aIndex}
                    onChange={() => handleAnswerChange(qIndex, aIndex)}
                    disabled={showResults}
                  />
                  {answer}
                </label>
              ))}
            </div>
          ))}
          {!showResults && <button type="submit">Submit</button>}
        </form>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Quiz;
