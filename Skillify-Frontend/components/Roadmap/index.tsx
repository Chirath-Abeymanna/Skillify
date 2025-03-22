import React, { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "../Quiz"; // Import the Quiz component

interface Milestone {
  milestoneName: string;
  milestoneDescription: string;
  searchQuery: string;
  milestoneLink?: string;
  completed?: boolean; // Added completed property
  accessible?: boolean; // Added accessible property
  roadmap: string; // Added roadmap property
}

const generatePath = (milestones: number, width: number, height: number) => {
  let pathD = `M ${width / 2} ${height} `; // Start from bottom center
  let positions: { x: number; y: number }[] = [{ x: width / 2, y: height }];

  const curveWidth = width * 0.25; // *** Reduced width of curves ***

  for (let i = 1; i < milestones; i++) {
    const isLeft = i % 2 === 1;
    const x = isLeft ? width / 2 - curveWidth : width / 2 + curveWidth; // Less horizontal distance
    const y = height - i * (height / milestones) * 1.1; // Move milestones upwards evenly

    // Control points positioned **above** the next milestone to ensure upward curves
    const cpX1 = positions[i - 1].x;
    const cpX2 = x;
    const cpY1 = positions[i - 1].y - (height / milestones) * 1; // More curve control
    const cpY2 = y + (height / milestones) * 1;

    positions.push({ x, y });

    pathD += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y} `;
  }

  return { pathD, positions };
};

const Roadmap: React.FC<{
  roadmap: Milestone[];
  colors: {
    backgroundColor: string;
    milestoneColor: string;
    roadColor: string;
  };
  onRoadmapUpdate?: (updatedRoadmap: any) => void;
}> = ({ roadmap, colors, onRoadmapUpdate }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null); // State to track active milestone
  const [showQuiz, setShowQuiz] = useState(false); // State to track if the quiz should be shown
  const [quizMilestone, setQuizMilestone] = useState<Milestone | null>(null); // State to store the milestone for the quiz

  const isMilestoneAccessible = (index: number): boolean => {
    const milestone = roadmap[index];
    if (!milestone) return false;

    // First milestone is always accessible
    if (index === 0) return true;

    // Check if the previous milestone is completed
    const previousMilestone = roadmap[index - 1];
    return Boolean(previousMilestone?.completed);
  };

  // Access window only after the component mounts on the client side
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []); // Empty dependency array to run this only once after mount

  // Ensure the screenWidth and screenHeight are available
  if (
    screenWidth === 0 ||
    screenHeight === 0 ||
    !roadmap ||
    roadmap.length === 0
  )
    return null;

  const { pathD, positions } = generatePath(
    roadmap.length,
    screenWidth,
    screenHeight + 150
  );

  const handleQuizComplete = async () => {
    setShowQuiz(false);

    if (quizMilestone) {
      try {
        // Fetch the updated roadmap data
        const response = await axios.get(
          `/api/getRoadmap?roadmapId=${quizMilestone.roadmap}`
        );
        const updatedRoadmap = response.data;

        // Update the local state
        if (onRoadmapUpdate) {
          onRoadmapUpdate(updatedRoadmap.milestones);
        }
      } catch (error) {
        console.error("Error fetching updated roadmap:", error);
      }
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-end justify-center overflow-auto"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {!showQuiz ? (
        <svg
          className="relative w-full"
          viewBox={`0 0 ${screenWidth} ${screenHeight + 200}`}
          fill="none"
        >
          {/* Road Path */}
          <path
            d={pathD}
            stroke={colors.roadColor}
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
          />

          {/* Dashed Center Line */}
          <path
            d={pathD}
            stroke="white"
            strokeWidth="10"
            strokeDasharray="20, 20"
            fill="none"
          />

          {/* Milestone Points */}
          {roadmap &&
            roadmap.map((milestone, index) => (
              <g
                key={index}
                onMouseEnter={() =>
                  isMilestoneAccessible(index) && setActiveMilestone(index)
                }
                onMouseLeave={() => setActiveMilestone(null)}
                onClick={() =>
                  isMilestoneAccessible(index) && setActiveMilestone(index)
                }
                style={{
                  cursor: isMilestoneAccessible(index)
                    ? "pointer"
                    : "not-allowed",
                }}
              >
                <circle
                  cx={positions[index].x}
                  cy={positions[index].y}
                  r="25"
                  fill={
                    isMilestoneAccessible(index)
                      ? colors.milestoneColor
                      : "#gray"
                  }
                  opacity={isMilestoneAccessible(index) ? 1 : 0.5}
                  style={{ transition: "all 0.3s" }}
                />
                <text
                  x={positions[index].x + (index % 2 === 0 ? 60 : 80)} // Adjusted text placement
                  y={positions[index].y + 5}
                  fontSize="16"
                  fill={isMilestoneAccessible(index) ? "black" : "gray"}
                  fontWeight="bold"
                >
                  {milestone.milestoneName}
                  {milestone.completed && " ✓"}
                </text>

                {/* Tooltip for showing milestone details */}
                {activeMilestone === index && isMilestoneAccessible(index) && (
                  <foreignObject
                    x={positions[index].x + 15}
                    y={positions[index].y - 80}
                    width="300"
                    height="300"
                  >
                    <div
                      className="bg-white p-2 border rounded shadow-lg text-black text-sm"
                      style={{ position: "absolute", zIndex: 10 }}
                    >
                      <p className="font-bold pb-3">
                        {milestone.milestoneName}
                      </p>
                      <p className="text-sm text-gray-400 pb-3">
                        {milestone.milestoneDescription}
                      </p>
                      {milestone.milestoneLink && (
                        <a
                          href={milestone.milestoneLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Course Link
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setQuizMilestone(milestone);
                          setShowQuiz(true);
                        }}
                        className="mt-2 bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-700"
                      >
                        Take Quiz
                      </button>
                    </div>
                  </foreignObject>
                )}
              </g>
            ))}
        </svg>
      ) : (
        <Quiz
          milestone={quizMilestone as any}
          onQuizComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default Roadmap;
