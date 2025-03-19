"use client";
import { useState } from "react";
import techStacks from "@/Data/TechStacks.json";
import MessageBox from "@/components/MessageBox";

const [messages, setMessages] = useState<
  { message: string; type: "success" | "info" | "warning" | "error" }[]
>([]);


const [selectedTechStack, setSelectedTechStack] = useState<string>("");
const [jobRoles, setJobRoles] = useState<string[]>([]);
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    if (!selectedTechStack) {
      setMessages([...messages, { message: "Select a Tech Stack first", type: "warning" }]);
      return;
    }    
    const selectedStack = techStacks.find(
      (stack) => stack.tech_stack === selectedTechStack
    );
    setJobRoles(selectedStack ? selectedStack.job_roles : []);
  } catch (error) {
    setMessages([...messages, { message: "An error occurred", type: "error" }]);
  }
  const selectedStack = techStacks.find(
    (stack) => stack.tech_stack === selectedTechStack
  );
  const roles = selectedStack ? selectedStack.job_roles : [];
  setJobRoles(roles);
  
};

export default function TechStackMatcher(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-500">Tech Stack Matcher</h1>
    </div>
  );
  
}

<><><><select
  onChange={(e) => setSelectedTechStack(e.target.value)}
  className="border p-2 rounded-lg"
>
  <option value="">Choose tech stack</option>
  {techStacks.map((stack) => (
    <option key={stack.tech_stack} value={stack.tech_stack}>
      {stack.tech_stack}
    </option>
  ))}
</select><ul>
    {jobRoles.map((role, idx) => (
      <li key={idx} className="p-2 border-b">{role}</li>
    ))}
  </ul></><div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-lg">
    <h1 className="text-2xl font-bold text-blue-500">Tech Stack Matcher</h1>
  </div></><div className="absolute inset-0">
    <img src="/images/DeegreeMatcher/bluebg2.jpg" className="w-full h-full object-cover" />
  </div></>



