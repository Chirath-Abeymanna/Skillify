"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Roadmap from "../../../components/Roadmap";
import RoadmapCard from "../../../components/RoadmapCard";
import MessageBox from "@/components/MessageBox";
import GenerateRoadmapUI from "@/components/GenerateRoadmap";

const CareerMapPage: React.FC = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showCreateUI, setShowCreateUI] = useState(false);
  const [careerGoals, setCareerGoals] = useState("");
  const [skills, setSkills] = useState("");
  const [userRoadmaps, setUserRoadmaps] = useState<any[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);

  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  interface Milestone {
    _id?: string;
    milestoneName: string;
    description: string;
    searchQuery: string;
    courseLink?: string;
    completed: boolean;
  }

  const [roadmap, setRoadmap] = useState<{
    roadmapName: string;
    milestones: Milestone[];
  }>({
    roadmapName: "",
    milestones: [],
  });
  const [colors, setColors] = useState({
    backgroundColor: "",
    milestoneColor: "",
    roadColor: "",
  });

  // Define color lists
  const backgroundColors = ["#f0f4f8", "#e8f5e9", "#fff3e0"];
  const milestoneColors = ["#D3D3D3", "#FFD700", "#FF6347"];
  const roadColors = ["#4A90E2", "#32CD32", "#FF4500"];

  // Set colors once when the component mounts
  useEffect(() => {
    const selectedColors = {
      backgroundColor:
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
      milestoneColor:
        milestoneColors[Math.floor(Math.random() * milestoneColors.length)],
      roadColor: roadColors[Math.floor(Math.random() * roadColors.length)],
    };

    setColors(selectedColors);
  }, []); // Empty dependency array to run this only once after mount

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/getUserRoadmaps?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserRoadmaps(data.roadmaps || []);
          setIsLoading(false); // Set loading to false after fetching
        })
        .catch((error) => {
          console.error("Error fetching user roadmaps:", error);
          setIsLoading(false); // Set loading to false even if there's an error
        });
    }
  }, [session]);

  const submit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/generateRoadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ careerGoals, skills }),
      });

      const data = await response.json();
      setRoadmap(data);
      setSelectedRoadmap(null); // Reset selected roadmap
      setShowCreateUI(false); // Hide the create UI
      setShowRoadmap(true); // Show the roadmap view

      // Save roadmap to the database
      await fetch("/api/saveRoadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roadmap: data,
          email: session?.user?.email,
          colors,
        }),
      });

      // Fetch updated roadmaps
      const updatedRoadmapsResponse = await fetch(
        `/api/getUserRoadmaps?email=${session?.user?.email}`
      );
      const updatedRoadmapsData = await updatedRoadmapsResponse.json();
      setUserRoadmaps(updatedRoadmapsData.roadmaps || []);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setMessages([{ message: "Error generating roadmap", type: "error" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const viewRoadmap = async (roadmapId: string) => {
    try {
      const response = await fetch(`/api/getRoadmap?roadmapId=${roadmapId}`);
      const data = await response.json();
      setSelectedRoadmap(data);
      setColors({
        backgroundColor: data.backgroundColor,
        milestoneColor: data.milestoneColor,
        roadColor: data.roadColor,
      });
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  const handleRoadmapUpdate = (updatedMilestones: any[]) => {
    if (selectedRoadmap) {
      setSelectedRoadmap({
        ...selectedRoadmap,
        milestones: updatedMilestones,
      });
    }
  };

  const calculateProgress = async (milestones: string[]): Promise<number> => {
    if (!milestones || milestones.length === 0) return 0;

    try {
      // Join the array of milestone IDs into a single string separated by commas
      const milestoneIds = milestones.join(",");

      // Make the API request with the formatted milestone IDs
      const response = await fetch(
        `/api/getMilestoneDetails?milestoneIds=${milestoneIds}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch milestone details");
      }

      // Parse the response and access the milestone details
      const { milestones: milestoneDetails } = await response.json();

      // Calculate the progress by counting completed milestones
      const completedMilestones = milestoneDetails.filter(
        (milestone: any) => milestone.completed
      ).length;

      // Calculate and return progress as a percentage
      return Math.round((completedMilestones / milestoneDetails.length) * 100);
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      const response = await fetch(
        `/api/deleteRoadmap?roadmapId=${roadmapId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUserRoadmaps(
          userRoadmaps.filter((roadmap) => roadmap._id !== roadmapId)
        );
        setMessages([
          { message: "Roadmap deleted successfully", type: "success" },
        ]);
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
  };

  const handleBackToRoadmaps = () => {
    setShowCreateUI(false);
    setShowRoadmap(false);
    setCareerGoals("");
    setSkills("");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-Poppins">
        <p className="text-lg">Please sign in to view your career map.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-Poppins">
        <p className="text-lg">Loading your career map...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-Poppins">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}

      {userRoadmaps?.length === 0 && !showRoadmap && !showCreateUI ? (
        // First time user view
        <GenerateRoadmapUI
          onSubmit={submit}
          careerGoals={careerGoals}
          setCareerGoals={setCareerGoals}
          skills={skills}
          setSkills={setSkills}
          onBack={handleBackToRoadmaps}
        />
      ) : !showRoadmap && !showCreateUI ? (
        // Roadmap list view
        <div className="w-full">
          <div className="relative top-10 left-5 flex justify-start mb-10">
            <button
              className="bg-blue-500 text-white px-4 py-4 rounded-full hover:bg-blue-700 mb-10"
              onClick={() => setShowCreateUI(true)}
            >
              + New Roadmap
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-12 p-5 rounded-3xl bg-slate-100">
            {userRoadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap._id}
                roadmapName={roadmap.roadmapName}
                description={roadmap.description || "No description available"}
                progress={0} // Initial progress
                onProgressCalculated={calculateProgress(roadmap.milestones)} // Pass the promise
                onView={() => viewRoadmap(roadmap._id)}
                onDelete={() => handleDeleteRoadmap(roadmap._id)}
                roadmapId={roadmap._id}
                onViewCertificate={function (id: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ))}
          </div>
        </div>
      ) : showCreateUI ? (
        // Show generate UI when creating new roadmap
        <GenerateRoadmapUI
          onSubmit={submit}
          careerGoals={careerGoals}
          setCareerGoals={setCareerGoals}
          skills={skills}
          setSkills={setSkills}
          onBack={handleBackToRoadmaps}
        />
      ) : (
        // Show roadmap view
        <Roadmap
          roadmap={
            selectedRoadmap ? selectedRoadmap.milestones : roadmap.milestones
          }
          colors={colors}
          onRoadmapUpdate={handleRoadmapUpdate}
          onBack={handleBackToRoadmaps}
        />
      )}
    </div>
  );
};

export default CareerMapPage;
