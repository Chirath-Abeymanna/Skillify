"use client";

import { useParams } from "next/navigation";
import Quiz from "@/components/Quiz";

const QuizPage = () => {
  const params = useParams();
  const milestone = params.milestone;

  console.log("Milestone:", milestone);
  console.log("Params", params);

  if (!milestone || typeof milestone !== "string") {
    return <div>Invalid milestone</div>;
  }

  return <Quiz milestone={milestone} />;
};

export default QuizPage;
