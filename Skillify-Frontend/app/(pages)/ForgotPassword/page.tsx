"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import MessageBox from "@/components/MessageBox";

const ForgetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/check-email", { email });
      if (response.data.exists) {
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

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP submitted:", otp.join(""));
  };

  const handleClearOtp = () => {
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleResendOtp = () => {
    // Handle resend OTP logic here
    console.log("Resend OTP");
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
