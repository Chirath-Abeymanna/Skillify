"use client";
import Certificate from "@/components/certificate/Certificate";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const roadmapId = searchParams.get("roadmapId");
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);
  const [selectedMilestones, setSelectedMilestones] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmapData = async () => {
      if (!roadmapId) {
        setError("No roadmap ID provided");
        setLoading(false);
        return;
      }

      try {
        // Use the correct query parameter name 'id'
        const response = await fetch(`/api/getRoadmap?roadmapId=${roadmapId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch roadmap");
        }

        const data = await response.json();

        setSelectedRoadmap(data);
        setSelectedMilestones(data.milestones);
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmapData();
  }, [roadmapId]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="h-screen mt-10">
        <p className="relative top-10">Error: {error}</p>
      </div>
    );
  if (!selectedRoadmap) return <div>No roadmap found</div>;

  // Check if all milestones are completed
  const allMilestonesCompleted = selectedMilestones?.every(
    (milestone: any) => milestone.completed === true
  );

  if (!allMilestonesCompleted) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">
          Please complete all milestones to receive your certificate.
        </p>
      </div>
    );
  }

  return <Certificate />;
}
