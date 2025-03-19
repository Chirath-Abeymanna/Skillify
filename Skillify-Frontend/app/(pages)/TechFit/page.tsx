"use client";
import { useState } from "react";
import techStacks from "@/Data/TechStacks.json";

export default function TechStackMatcher(): JSX.Element {
  const [selectedTechStack, setSelectedTechStack] = useState<string>("");
  const [jobRoles, setJobRoles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">Tech Stack Matcher</h1>  
    </div>
  );
}
