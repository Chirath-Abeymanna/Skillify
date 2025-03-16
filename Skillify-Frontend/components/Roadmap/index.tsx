import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Milestone {
  milestoneName: string;
  description: string;
  searchQuery: string;
  courseLink?: string;
}

const generatePath = (milestones: number, width: number, height: number) => {
  let pathD = `M ${width / 2} ${height} `; // Start from bottom center
  let positions: { x: number; y: number }[] = [{ x: width / 2, y: height }];

  const curveWidth = width * 0.08; // *** Reduced width of curves ***

  for (let i = 1; i < milestones; i++) {
    const isLeft = i % 2 === 1;
    const x = isLeft ? width / 2 - curveWidth : width / 2 + curveWidth; // Less horizontal distance
    const y = height - i * (height / milestones) * 1.1; // Move milestones upwards evenly

    // Control points positioned **above** the next milestone to ensure upward curves
    const cpX1 = positions[i - 1].x;
    const cpX2 = x;
    const cpY1 = positions[i - 1].y - (height / milestones) * 0.8; // More curve control
    const cpY2 = y + (height / milestones) * 0.8;

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
}> = ({ roadmap, colors }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null); // State to track active milestone

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

  return (
    <div
      className="relative w-full min-h-screen flex items-end justify-center overflow-auto"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <svg
        className="relative w-full"
        viewBox={`0 0 ${screenWidth} ${screenHeight + 200}`}
        fill="none"
      >
        {/* Road Path */}
        <path
          d={pathD}
          stroke={colors.roadColor}
          strokeWidth="100"
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
              onMouseEnter={() => setActiveMilestone(index)} // Show tooltip on hover
              onMouseLeave={() => setActiveMilestone(null)} // Hide tooltip when mouse leaves
              onClick={() => setActiveMilestone(index)} // Show tooltip on click (for mobile users)
            >
              <circle
                cx={positions[index].x}
                cy={positions[index].y}
                r="25"
                fill={colors.milestoneColor}
                style={{ transition: "all 0.3s", cursor: "pointer" }}
              />
              <text
                x={positions[index].x + (index % 2 === 0 ? 60 : 80)} // Adjusted text placement
                y={positions[index].y + 5}
                fontSize="16"
                fill="black"
                fontWeight="bold"
              >
                {milestone.milestoneName}
              </text>

              {/* Tooltip for showing milestone details */}
              {activeMilestone === index && (
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
                    <p className="font-bold pb-3">{milestone.milestoneName}</p>
                    <p className="text-sm text-gray-400 pb-3">
                      {milestone.description}
                    </p>
                    {milestone.courseLink && (
                      <a
                        href={milestone.courseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Course Link
                      </a>
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          ))}
      </svg>
    </div>
  );
};

export default Roadmap;
