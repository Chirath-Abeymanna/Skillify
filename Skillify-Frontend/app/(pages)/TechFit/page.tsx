"use client";
import { useState } from "react";
import techStacks from "@/Data/TechStacks.json";

export default function TechStackMatcher(): JSX.Element {
  const [selectedTechStack, setSelectedTechStack] = useState<string>("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedStack = techStacks.find(
      (stack) => stack.tech_stack === selectedTechStack
    );
    setJobRoles(selectedStack ? selectedStack.job_roles : []);
  };  

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Tech Stack Matcher</h1>  
    </div>
  );
    <select
    onChange={(e) => setSelectedTechStack(e.target.value)}
    className="border p-2 rounded-lg"
    >
      <option value="">Choose tech stack</option>
      {techStacks.map((stack) => (
        <option key={stack.tech_stack} value={stack.tech_stack}>
          {stack.tech_stack}
        </option>
      ))}
    </select>


}
