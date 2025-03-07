"use client";
import { useState } from "react";
import data from "@/Data/Degrees.json";

const DEGREE_CATEGORIES: string[] = ["Bio", "Mathematics", "Commerce", "Art"];

export default function DegreeMatcher(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const filteredPrograms =
        data[selectedCategory as keyof typeof data] || [];
      setRecommendedPrograms(filteredPrograms);
    } catch (error) {
      console.error("Error fetching degree programs:", error);
    }
  };