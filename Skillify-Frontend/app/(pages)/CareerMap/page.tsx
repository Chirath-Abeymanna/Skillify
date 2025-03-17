"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Spline from "@splinetool/react-spline";
import Roadmap from "../../../components/Roadmap";

const CareerMapPage: React.FC = () => {
  const { data: session } = useSession();
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showCreateUI, setShowCreateUI] = useState(false);
  const [careerGoals, setCareerGoals] = useState("");
  const [skills, setSkills] = useState("");
  const [userRoadmaps, setUserRoadmaps] = useState<any[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);
  interface Milestone {
    milestoneName: string;
    description: string;
    searchQuery: string;
    courseLink?: string;
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
        .then((data) => setUserRoadmaps(data.roadmaps || []))
        .catch((error) =>
          console.error("Error fetching user roadmaps:", error)
        );
    }
  }, [session]);

  const submit = async () => {
    console.log("Career Map Submitted");
    console.log("Career Goals:", careerGoals);
    console.log("Skills:", skills);

    try {
      const response = await fetch("/api/generateRoadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ careerGoals, skills }),
      });

      const data = await response.json();
      setRoadmap(data); // Update to set the entire roadmap data
      setShowRoadmap(true);

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
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  const viewRoadmap = async (roadmapId: string) => {
    try {
      const response = await fetch(`/api/getRoadmap?roadmapId=${roadmapId}`);
      const data = await response.json();
      setSelectedRoadmap(data);
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-Poppins">
        <p className="text-lg">Please sign in to view your career map.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-Poppins">
      {(userRoadmaps?.length === 0 && !showRoadmap) || showCreateUI ? (
        <>
          <div className="w-full lg:w-2/3 flex flex-col p-4 lg:p-10">
            <div className="mt-3 w-full justify-center text-lg">
              <div className="flex flex-wrap mb-10 space-x-10 justify-center lg:justify-start">
                <img
                  src="/images/aboutus/imgFive.svg"
                  className="w-32 h-32"
                  alt=""
                />
                <h1 className="relative top-10 text-4xl lg:text-6xl font-bold text-center text-sky-400">
                  Career Map
                </h1>
              </div>

              <p className="mb-2 text-center lg:text-left">
                A roadmap is your personalized visual blueprint that maps out
                the key steps to unlock your career success.
              </p>
              <p className="mb-6 text-center lg:text-left">
                Tell us about your career goals and your current skill set.
              </p>

              <textarea
                className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your career goals"
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
              />

              <textarea
                className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your current skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />

              <div className="w-[80%] flex justify-center">
                <button
                  type="button"
                  onClick={submit}
                  className="bg-blue-500 text-white border-indigo-900 hover:bg-blue-700 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Generate Your Roadmap
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center lg:w-2/4 h-screen">
            <div>
              <Spline scene="https://prod.spline.design/AxO7FIBoaQOM0Hr2/scene.splinecode" />
            </div>
          </div>
        </>
      ) : null}
      {userRoadmaps?.length > 0 && !showRoadmap && !showCreateUI && (
        <div className="w-full">
          <div className="relative top-10 left-5 flex justify-start mb-10">
            <button
              className="bg-blue-500 text-white px-4 py-4 rounded-full hover:bg-blue-700 mb-10"
              onClick={() => setShowCreateUI(true)}
            >
              + New Roadmap
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-12 p-5 rounded-3xl gap-x-16 lg:gap-x-32 bg-slate-100 ">
            {userRoadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className="bg-white rounded-3xl p-4  m-4 w-80 h-max shadow-xl"
              >
                <h2 className="text-xl font-semibold mb-20">
                  {roadmap.roadmapName}
                </h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => viewRoadmap(roadmap._id)}
                >
                  View Roadmap
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {(showRoadmap || showCreateUI) && (
        <Roadmap
          roadmap={
            selectedRoadmap ? selectedRoadmap.milestones : roadmap.milestones
          }
          colors={colors}
        />
      )}{" "}
      {/* Pass roadmap data */}
    </div>
  );
};

export default CareerMapPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import Spline from "@splinetool/react-spline";
// import Roadmap from "../../../components/Roadmap";

// const CareerMapPage: React.FC = () => {
//   const { data: session } = useSession();
//   const [showRoadmap, setShowRoadmap] = useState(false);
//   const [showCreateUI, setShowCreateUI] = useState(false);
//   const [careerGoals, setCareerGoals] = useState("");
//   const [skills, setSkills] = useState("");
//   const [userRoadmaps, setUserRoadmaps] = useState<any[]>([]);
//   const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);

//   interface Milestone {
//     milestoneName: string;
//     description: string;
//     searchQuery: string;
//     courseLink?: string;
//   }

//   const [roadmap, setRoadmap] = useState<{
//     roadmapName: string;
//     milestones: Milestone[];
//   }>({
//     roadmapName: "",
//     milestones: [],
//   });

//   const [colors, setColors] = useState({
//     backgroundColor: "",
//     milestoneColor: "",
//     roadColor: "",
//   });

//   // Define color lists
//   const backgroundColors = ["#f0f4f8", "#e8f5e9", "#fff3e0"];
//   const milestoneColors = ["#D3D3D3", "#FFD700", "#FF6347"];
//   const roadColors = ["#4A90E2", "#32CD32", "#FF4500"];

//   // Set colors once when the component mounts
//   useEffect(() => {
//     const selectedColors = {
//       backgroundColor:
//         backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
//       milestoneColor:
//         milestoneColors[Math.floor(Math.random() * milestoneColors.length)],
//       roadColor: roadColors[Math.floor(Math.random() * roadColors.length)],
//     };

//     setColors(selectedColors);
//   }, []); // Empty dependency array to run this only once after mount

//   useEffect(() => {
//     if (session?.user?.email) {
//       fetch(`/api/getUserRoadmaps?email=${session.user.email}`)
//         .then((res) => res.json())
//         .then((data) => setUserRoadmaps(data.roadmaps || []))
//         .catch((error) =>
//           console.error("Error fetching user roadmaps:", error)
//         );
//     }
//   }, [session]);

//   const submit = async () => {
//     console.log("Career Map Submitted");
//     console.log("Career Goals:", careerGoals);
//     console.log("Skills:", skills);

//     try {
//       const response = await fetch("/api/generateRoadmap", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ careerGoals, skills }),
//       });

//       const data = await response.json();
//       setRoadmap(data); // Update to set the entire roadmap data
//       setShowRoadmap(true);

//       // Save roadmap to the database
//       await fetch("/api/saveRoadmap", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           roadmap: data,
//           email: session?.user?.email,
//           colors,
//         }),
//       });
//     } catch (error) {
//       console.error("Error fetching roadmap:", error);
//     }
//   };

//   const viewRoadmap = async (roadmapId: string) => {
//     try {
//       const response = await fetch(`/api/getRoadmap?roadmapId=${roadmapId}`);
//       const data = await response.json();
//       setSelectedRoadmap(data);
//       setShowRoadmap(true);
//     } catch (error) {
//       console.error("Error fetching roadmap:", error);
//     }
//   };

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white font-Poppins">
//         <p className="text-lg">Please sign in to view your career map.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-white font-Poppins">
//       {(userRoadmaps.length === 0 && !showRoadmap) || showCreateUI ? (
//         <>
//           <div className="w-full lg:w-2/3 flex flex-col p-4 lg:p-10">
//             <div className="mt-3 w-full justify-center text-lg">
//               <div className="flex flex-wrap mb-10 space-x-10 justify-center lg:justify-start">
//                 <img
//                   src="/images/aboutus/imgFive.svg"
//                   className="w-32 h-32"
//                   alt=""
//                 />
//                 <h1 className="relative top-10 text-4xl lg:text-6xl font-bold text-center text-sky-400">
//                   Career Map
//                 </h1>
//               </div>

//               <p className="mb-2 text-center lg:text-left">
//                 A roadmap is your personalized visual blueprint that maps out
//                 the key steps to unlock your career success.
//               </p>
//               <p className="mb-6 text-center lg:text-left">
//                 Tell us about your career goals and your current skill set.
//               </p>

//               <textarea
//                 className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your career goals"
//                 value={careerGoals}
//                 onChange={(e) => setCareerGoals(e.target.value)}
//               />

//               <textarea
//                 className="w-[80%] lg:ml-10 h-24 border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your current skills"
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//               />

//               <div className="w-[80%] flex justify-center">
//                 <button
//                   type="button"
//                   onClick={submit}
//                   className="bg-blue-500 text-white border-indigo-900 hover:bg-blue-700 font-semibold rounded-xl px-6 py-3 text-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
//                 >
//                   Generate Your Roadmap
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="hidden lg:flex justify-center items-center lg:w-2/4 h-screen">
//             <div>
//               <Spline scene="https://prod.spline.design/AxO7FIBoaQOM0Hr2/scene.splinecode" />
//             </div>
//           </div>
//         </>
//       ) : null}
//       {userRoadmaps.length > 0 && !showRoadmap && !showCreateUI && (
//         <div className="w-full">
//           <div className="relative top-10 left-5 flex justify-start mb-10">
//             <button
//               className="bg-blue-500 text-white px-4 py-4 rounded-full hover:bg-blue-700 mb-10"
//               onClick={() => setShowCreateUI(true)}
//             >
//               + New Roadmap
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-12 p-5 rounded-3xl gap-x-16 lg:gap-x-32 bg-slate-100 ">
//             {userRoadmaps.map((roadmap) => (
//               <div
//                 key={roadmap._id}
//                 className="bg-white rounded-3xl p-4  m-4 w-80 h-max shadow-xl"
//               >
//                 <h2 className="text-xl font-semibold mb-20">
//                   {roadmap.roadmapName}
//                 </h2>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   onClick={() => viewRoadmap(roadmap._id)}
//                 >
//                   View Roadmap
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       {(showRoadmap || showCreateUI) && (
//         <Roadmap
//           roadmap={
//             selectedRoadmap ? selectedRoadmap.milestones : roadmap.milestones
//           }
//           colors={colors}
//         />
//       )}
//     </div>
//   );
// };

// export default CareerMapPage;
