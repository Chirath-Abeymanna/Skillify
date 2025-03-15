"use client";
import React, { useState, useRef } from "react";
import MessageBox from "@/components/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const generatedOtp = generateOtp();
    setGeneratedOtp(generatedOtp);
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.exists) {
        await fetch("/api/send-OTP", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: generatedOtp }),
        });
        setMessages([
          ...messages,
          {
            message: "Email verified successfully. OTP sent to your email.",
            type: "info",
          },
        ]);
        setOtpSent(true);
      } else {
        setMessages([
          ...messages,
          {
            message: "Provided email is not registered.",
            type: "error",
          },
        ]);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setMessages([
        ...messages,
        {
          message: "Internal server error. Contact support.",
          type: "error",
        },
      ]);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 6) {
        value.split("").forEach((digit, idx) => {
          if (idx < 6) {
            newOtp[idx] = digit;
            inputRefs.current[idx]!.value = digit;
          }
        });
        setOtp(newOtp);
      } else if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp === generatedOtp) {
      setMessages([
        ...messages,
        {
          message: "OTP verified successfully.",
          type: "success",
        },
      ]);
      setOtpVerified(true);
    } else {
      setMessages([
        ...messages,
        {
          message: "Invalid OTP. Please try again.",
          type: "error",
        },
      ]);
    }
  };

  const handleClearOtp = () => {
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleResendOtp = async () => {
    try {
      const newGeneratedOtp = generateOtp();
      setGeneratedOtp(newGeneratedOtp);
      await fetch("/api/send-OTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: newGeneratedOtp }),
      });
      setMessages([
        ...messages,
        {
          message: "OTP resent to your email.",
          type: "info",
        },
      ]);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setMessages([
        ...messages,
        {
          message: "Internal server error. Contact support.",
          type: "error",
        },
      ]);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessages([
        ...messages,
        {
          message: "Passwords do not match.",
          type: "error",
        },
      ]);
      return;
    }

    console.log(newPassword);

    if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newPassword)) {
      setMessages([
        ...messages,
        {
          message:
            "Password must be at least 8 characters long, contain an uppercase letter and a number.",
          type: "error",
        },
      ]);
      return;
    }

    try {
      await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });
      setMessages([
        ...messages,
        {
          message: "Password updated successfully.",
          type: "success",
        },
      ]);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessages([
        ...messages,
        {
          message: "Internal server error. Contact support.",
          type: "error",
        },
      ]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {!otpSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-5"
              >
                Enter your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 "
            >
              Verify Email
            </button>
          </form>
        ) : !otpVerified ? (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-5"
              >
                Enter OTP
              </label>
              <div className="flex justify-center space-x-2 mt-1">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleResendOtp}
                className=" text-blue-500 font-semibold rounded-md hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={handleClearOtp}
                className=" text-blue-500 underline font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="block font-medium text-gray-700 mb-5"
              >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-lg text-lg "
              />
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-14 right-3 cursor-pointer"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-5"
              >
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-lg sm:text-lg tracking-wide"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-14 right-3 cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
