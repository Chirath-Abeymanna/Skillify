import React, { useEffect, useState } from "react";

const roadmapData = [
  { id: 1, title: "Start", description: "Begin your journey", completed: true },
  {
    id: 2,
    title: "Skill Assessment",
    description: "Evaluate your current skills",
    completed: false,
  },
  {
    id: 3,
    title: "Learning Phase",
    description: "Acquire new skills",
    completed: false,
  },
  {
    id: 4,
    title: "Project Work",
    description: "Apply skills in real projects",
    completed: false,
  },
  {
    id: 5,
    title: "Job Application",
    description: "Prepare for your dream job",
    completed: false,
  },
  {
    id: 6,
    title: "Final Interview",
    description: "Ace your interviews",
    completed: false,
  },
  {
    id: 7,
    title: "Final Interview",
    description: "Ace your interviews",
    completed: false,
  },
];

const generatePath = (milestones: number, width: number, height: number) => {
  let pathD = `M ${width / 2} ${height} `; // Start from bottom center
  let positions: { x: number; y: number }[] = [{ x: width / 2, y: height }];

  const curveWidth = width * 0.09; // *** Reduced width of curves ***

  for (let i = 1; i < milestones; i++) {
    const isLeft = i % 2 === 1;
    const x = isLeft ? width / 2 - curveWidth : width / 2 + curveWidth; // Less horizontal distance
    const y = height - i * (height / milestones) * 3; // Move milestones upwards evenly

    // Control points positioned **above** the next milestone to ensure upward curves
    const cpX1 = positions[i - 1].x;
    const cpX2 = x;
    const cpY1 = positions[i - 1].y - (height / milestones) * 1.9; // More curve control
    const cpY2 = y + (height / milestones) * 1.9;

    positions.push({ x, y });

    pathD += `C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y} `;
  }

  return { pathD, positions };
};

const Roadmap = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  // Access window only after the component mounts on the client side
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []); // Empty dependency array to run this only once after mount

  // Ensure the screenWidth and screenHeight are available
  if (screenWidth === 0 || screenHeight === 0) return null;

  const { pathD, positions } = generatePath(
    roadmapData.length,
    screenWidth,
    screenHeight + 150
  );

  return (
    <div className="relative w-full min-h-screen flex items-end justify-center bg-slate-500 overflow-auto">
      <svg
        className="relative w-full"
        viewBox={`0 0 ${screenWidth} ${screenHeight + 200}`}
        fill="none"
      >
        {/* Road Path */}
        <path
          d={pathD}
          stroke="#4A90E2"
          strokeWidth="150"
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
        {roadmapData.map((milestone, index) => (
          <g key={milestone.id}>
            <circle
              cx={positions[index].x}
              cy={positions[index].y}
              r="50"
              fill={milestone.completed ? "#28A745" : "#D3D3D3"}
            />
            <text
              x={positions[index].x + (index % 2 === 0 ? 60 : 80)} // Adjusted text placement
              y={positions[index].y + 5}
              fontSize="16"
              fill="black"
              fontWeight="bold"
            >
              {milestone.title}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Roadmap;
