"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";

import GoogleSignInButton from "@/components/GoogleSignInButton";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("User Signed In:", formData);
      // Implement sign-in logic here
    }
  };

  return (
    <SessionProvider>
      <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 font-Poppins">
        {/* Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
        >
          <g fill="none" stroke="lightblue" strokeWidth="1">
            <circle cx="400" cy="300" r="200" />
            <circle cx="400" cy="300" r="400" />
            <circle cx="400" cy="300" r="600" />
          </g>
        </svg>

        {/* Main Container */}
        <div className="main-container  flex">
          {/* Picture Container */}
          <div className="hidden lg:flex Picture-container relative lg:w-[30rem] bg-[#98d3f5] lg:bottom-10 rounded-xl justify-center items-center z-10">
            <img
              src="/images/Signup_and_Signin/login.svg"
              alt="Signin Illustration"
              className="relative w-[20rem]"
            />
          </div>

          {/* Form Container */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="form-container relative lg:bottom-10 w-full lg:w-[30rem] max-w-md shadow-lg bg-white rounded-xl p-6 z-5"
          >
            <div>
              <h2 className="text-center text-2xl font-bold mb-4">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm">{errors.username}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-[#0F41EF] text-white rounded hover:bg-[#00115B] transition duration-300"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-4">
                <Link
                  href="/ForgotPassword"
                  className="text-faqblue hover:underline"
                >
                  Forgot Password?
                </Link>
              </p>

              <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">Or sign in using</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              <div className="flex justify-center space-x-10 mt-4">
                <GoogleSignInButton />
                <button
                  onClick={() => signIn("facebook")}
                  className="p-2 w-12 h-12 border text-white rounded hover:bg-gray-100 transition duration-300"
                >
                  <img src="/images/Signup_and_Signin/facebook.svg" alt="" />
                </button>
                <button
                  onClick={() => signIn("linkedin")}
                  className="p-2 w-12 h-12 border text-white rounded hover:bg-gray-100 transition duration-300"
                >
                  <img src="/images/Signup_and_Signin/linkedin.svg" alt="" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link href="/SignUp" className="text-faqblue hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default SignIn;
