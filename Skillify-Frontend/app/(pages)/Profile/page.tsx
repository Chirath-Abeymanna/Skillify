"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MessageBox from "@/components/MessageBox";

export default function UserProfile() {
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const user_mail = session?.user.email;

  // Ensure session.user exists to avoid errors
  interface User {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    avatar?: string | null;
    provider?: string | null;
  }

  const user: User = session?.user || {};

  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  // Initialized custom message box
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const handlePasswordVerification = async () => {
    try {
      const response = await fetch("/api/verifyPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user_mail,
          currentPassword: currentPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setMessages([
          ...messages,
          { message: "Password verified", type: "success" },
        ]);
      } else {
        setIsVerified(false);
        setMessages([
          ...messages,
          {
            message: data.message || "Error verifying password",
            type: "error",
          },
        ]);
      }
    } catch (error) {
      setMessages([...messages, { message: "Server error", type: "error" }]);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      setPasswordMatch(true);
      console.log("Password changed successfully");
    } else {
      setPasswordMatch(false);
    }
  };

  // Handle form state
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  console.log(user.avatar);
  const [selectedAvatar, setSelectedAvatar] = useState(
    session?.user.avatar || "Avatar1"
  );

  const avatars = [
    "Avatar1",
    "Avatar2",
    "Avatar3",
    "Avatar4",
    "Avatar5",
    "Avatar6",
    "Avatar7",
    "Avatar8",
  ];

  if (!isClient) return null;

  const handleSaveChanges = async () => {
    const requestBody = {
      email: user_mail || "",
      firstName,
      lastName,
      avatar: selectedAvatar, // Ensure this is a string URL, not a file
      newPassword:
        isVerified && newPassword === confirmPassword ? newPassword : undefined,
    };

    try {
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([
          ...messages,
          { message: "Profile updated successfully!", type: "success" },
        ]);
      } else {
        setMessages([
          ...messages,
          { message: data.message || "Update failed", type: "error" },
        ]);
      }
    } catch (error) {
      setMessages([...messages, { message: "Server error", type: "error" }]);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen font-Poppins">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/videos/profile/background.mp4" type="video/mp4" />
      </video>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

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
                src={`/images/Avatars/${selectedAvatar}.svg`}
                alt="Selected Avatar"
                className="w-48 h-48 rounded-full border-4 p-1 transition-all duration-200"
              />
              <p className="mt-2 text-sm text-white">Selected Avatar</p>
            </div>

            {/* Available Avatars */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={`/images/Avatars/${avatar}.svg`}
                  alt={`Avatar ${index + 1}`}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 p-1 bg-gradient-to-r transition-all duration-200 ${
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
          <div className="space-y-4 te">
            {/* Personal Details */}
            <div className="border p-4 rounded-md bg-white/20 backdrop-blur-md text-black">
              <h3 className="font-semibold mb-2">Change Personal Details</h3>

              <div className="block lg:flex lg:space-x-4">
                {/* First Name Input */}
                <div className="mb-5">
                  <label htmlFor="firstName" className="pb-5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName} // Always use state value
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => {
                      if (firstName.trim() === "") {
                        setFirstName(session?.user.firstName ?? ""); // Restore only if empty
                      }
                    }}
                    className="relative top-2 w-full h-12 p-2 border border-gray-300 rounded bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                  />
                </div>

                {/* Last Name Input */}
                <div>
                  <label htmlFor="lastName" className="pb-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName} // Always use state value
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => {
                      if (lastName.trim() === "") {
                        setLastName(session?.user.lastName ?? ""); // Restore only if empty
                      }
                    }}
                    className="relative top-2 w-full h-12 p-2 border border-gray-300 rounded bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Sensitive details */}
            {session?.user.provider == "credentials" && (
              <div className="border p-4 rounded-md bg-white/20 backdrop-blur-md ">
                <h3 className="font-semibold mb-2">Change Password</h3>
                <div className="lg:flex lg:space-x-20 ">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-[70%] p-2 border border-gray-300 rounded bg-transparent outline-none text-gray-500 focus:ring-2"
                  />
                  <button
                    onClick={handlePasswordVerification}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Verify
                  </button>
                </div>

                {isVerified && (
                  <>
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 mt-4 border border-gray-300 rounded bg-transparent outline-none text-gray-500 focus:ring-2"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 mt-2 border border-gray-300 rounded bg-transparent outline-none text-gray-500 focus:ring-2"
                    />
                    {!passwordMatch && (
                      <p className="text-red-500">Passwords do not match.</p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4 font-semibold">
            <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
              Cancel Changes
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-[#002DF4] text-white rounded hover:bg-[#121e4d]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
