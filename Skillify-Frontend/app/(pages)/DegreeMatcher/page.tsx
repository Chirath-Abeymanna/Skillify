"use client";
import { useState } from "react";

const PEOPLE_SKILLS: string[] = ["Communication", "Teamwork", "Leadership", "Conflict Resolution"];
const PHYSICAL_SKILLS: string[] = ["Hand-Eye Coordination", "Physical Endurance", "Manual Dexterity"];
const IDEAS_SKILLS: string[] = ["Creativity", "Problem-Solving", "Innovation"];
const DATA_SKILLS: string[] = ["Data Analysis", "Statistical Methods", "Database Management"];

type SkillCategory = "people" | "physical" | "ideas" | "data";

export default function DegreeMatcher(): JSX.Element {
  const [peopleSkills, setPeopleSkills] = useState<string[]>([]);
  const [physicalSkills, setPhysicalSkills] = useState<string[]>([]);
  const [ideasSkills, setIdeasSkills] = useState<string[]>([]);
  const [dataSkills, setDataSkills] = useState<string[]>([]);
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);

  // Helper function to handle skill selection from dropdown
  const handleSkillSelect = (skill: string, category: SkillCategory): void => {
    if (!skill) return;
    switch (category) {
      case "people":
        if (!peopleSkills.includes(skill)) setPeopleSkills([...peopleSkills, skill]);
        break;
      case "physical":
        if (!physicalSkills.includes(skill)) setPhysicalSkills([...physicalSkills, skill]);
        break;
      case "ideas":
        if (!ideasSkills.includes(skill)) setIdeasSkills([...ideasSkills, skill]);
        break;
      case "data":
        if (!dataSkills.includes(skill)) setDataSkills([...dataSkills, skill]);
        break;
      default:
        break;
    }
  };

  // Remove a skill from the selected list
  const removeSkill = (skill: string, category: SkillCategory): void => {
    switch (category) {
      case "people":
        setPeopleSkills(peopleSkills.filter((s) => s !== skill));
        break;
      case "physical":
        setPhysicalSkills(physicalSkills.filter((s) => s !== skill));
        break;
      case "ideas":
        setIdeasSkills(ideasSkills.filter((s) => s !== skill));
        break;
      case "data":
        setDataSkills(dataSkills.filter((s) => s !== skill));
        break;
      default:
        break;
    }
  };

  // Handle form submission to backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/get_degree_programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          peopleSkills,
          physicalSkills,
          ideasSkills,
          dataSkills,
        }),
      });
      const data = await res.json();
      setRecommendedPrograms(data.recommended_programs || []);
    } catch (error) {
      console.error("Error fetching degree programs:", error);
    }
  };

  return (
    <div className="min-h-screen w-full p-0 m-0 text-black font-sans">
      

      {/* Heading */}
      <header className="text-center mt-8 mb-8">
        <h1 className="text-5xl my-2">DEGREE MATCHING</h1>
        <p className="max-w-[600px] mx-auto text-lg leading-relaxed">
          See how your skills stack up! Our Degree Matcher analyzes your strengths and gaps,
          connecting you to targeted resources and opportunities to level up, match, grow,
          and take your career further.
        </p>
      </header>

      {/* Skills Selection Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 max-w-[800px] mx-auto p-4 bg-white bg-opacity-10 rounded-lg"
      >
        <div className="flex flex-col items-start w-4/5">
          <label>People</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSkillSelect(e.target.value, "people")}
            className="w-full p-2 rounded"
          >
            <option value="">Choose skill</option>
            {PEOPLE_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start w-4/5">
          <label>Physical</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSkillSelect(e.target.value, "physical")}
            className="w-full p-2 rounded"
          >
            <option value="">Choose skill</option>
            {PHYSICAL_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start w-4/5">
          <label>Ideas</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSkillSelect(e.target.value, "ideas")}
            className="w-full p-2 rounded"
          >
            <option value="">Choose skill</option>
            {IDEAS_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-start w-4/5">
          <label>Data &amp; Information</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSkillSelect(e.target.value, "data")}
            className="w-full p-2 rounded"
          >
            <option value="">Choose skill</option>
            {DATA_SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Skills */}
        <div className="w-4/5 bg-black/20 p-4 rounded-lg">
          <h3>Selected Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {peopleSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#333] px-2 py-1 rounded cursor-pointer inline-block"
                onClick={() => removeSkill(skill, "people")}
              >
                {skill} &times;
              </span>
            ))}
            {physicalSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#333] px-2 py-1 rounded cursor-pointer inline-block"
                onClick={() => removeSkill(skill, "physical")}
              >
                {skill} &times;
              </span>
            ))}
            {ideasSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#333] px-2 py-1 rounded cursor-pointer inline-block"
                onClick={() => removeSkill(skill, "ideas")}
              >
                {skill} &times;
              </span>
            ))}
            {dataSkills.map((skill) => (
              <span
                key={skill}
                className="bg-[#333] px-2 py-1 rounded cursor-pointer inline-block"
                onClick={() => removeSkill(skill, "data")}
              >
                {skill} &times;
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-white text-gray-800 rounded px-6 py-3 text-base mt-4">
          Get degree programs
        </button>
      </form>

      {/* Display recommended programs */}
      {recommendedPrograms.length > 0 && (
        <div className="mt-8 text-center">
          <h2>Recommended Programs:</h2>
          <ul>
            {recommendedPrograms.map((prog, idx) => (
              <li key={idx}>{prog}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
