"use client";

import { useState, useEffect } from "react";

export default function UserProfile() {
  // Ensure the component runs only on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [selectedAvatar, setSelectedAvatar] = useState(
    "/images/Avatars/default.svg"
  );

  const avatars = [
    "/images/Avatars/Avatar1.svg",
    "/images/Avatars/Avatar2.svg",
    "/images/Avatars/Avatar3.svg",
    "/images/Avatars/Avatar4.svg",
    "/images/Avatars/Avatar5.svg",
    "/images/Avatars/Avatar6.svg",
    "/images/Avatars/Avatar7.svg",
    "/images/Avatars/Avatar8.svg",
  ];

  // Prevent SSR mismatches
  if (!isClient) return null;

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
      >
        <source src="/public/videos/profile/background.mp4" type="video/mp4" />
      </video>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-xl"></div>

      {/* Main Content */}
      <main className="relative flex-grow flex justify-center items-center py-10 px-4">
        <div className="max-w-3xl w-full p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-center text-white">
            User Profile
          </h2>

          {/* Avatar Selection */}
          <div className="flex flex-col sm:flex-row items-center justify-center my-4 sm:gap-16 gap-6">
            {/* Selected Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                className={`w-24 h-24 rounded-full border-4 p-1 transition-all duration-200 ${
                  selectedAvatar === "/images/Avatars/default.svg"
                    ? "bg-gradient-to-r from-[#002DF4] to-[#000E4B] border-blue-500"
                    : "bg-[#002DF4] border-blue-500"
                }`}
              />
              <p className="mt-2 text-sm text-white">Selected Avatar</p>
            </div>

            {/* Available Avatars */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 p-1 bg-gradient-to-r from-[#002DF4] to-[#000E4B] transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? "border-blue-500 scale-110"
                      : "border-gray-300 hover:border-blue-400 hover:scale-105"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-4">
            {/* Personal Details */}
            <div className="border p-4 rounded-md bg-white/20 backdrop-blur-md text-white">
              <h3 className="font-semibold mb-2">Change Personal Details</h3>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded bg-transparent text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded bg-transparent text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none mt-2"
              />
            </div>

            {/* Contact Details */}
            <div className="border p-4 rounded-md bg-white/20 backdrop-blur-md text-white">
              <h3 className="font-semibold mb-2">Change Contact Details</h3>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border border-gray-300 rounded bg-transparent text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 bg-gray-300 text-black rounded">
              Cancel Changes
            </button>
            <button className="px-4 py-2 bg-[#002DF4] text-white rounded">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
