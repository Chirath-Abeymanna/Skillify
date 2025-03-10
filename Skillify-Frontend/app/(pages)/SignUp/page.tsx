"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import MessageBox from "@/components/MessageBox";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [reEnterPassword, setReEnterPassword] = useState("");
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "reEnterPassword") {
      setReEnterPassword(value); // Handling re-enter password separately
    } else {
      setFormData({ ...formData, [name]: value }); // For other fields, update formData
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Updated regex
    if (!formData.password) {
      newErrors.password = "Password is required";
      console.log(formData.password);
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, and a number";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (!reEnterPassword) {
      newErrors.reEnterPassword = "Re-enter password is required";
      valid = false;
    } else if (formData.password !== reEnterPassword) {
      newErrors.reEnterPassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.reEnterPassword = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const cleanedFormData = {
        ...formData,
        password: formData.password.trim(),
      };

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanedFormData),
        });

        if (!response.ok) {
          const data = await response
            .json()
            .catch(() => ({ error: "Invalid response" }));
          setMessages([
            ...messages,
            { message: data.error || "Registration failed", type: "error" },
          ]);
          return;
        }

        setMessages([
          ...messages,
          { message: "User registered successfully!", type: "success" },
        ]);

        setTimeout(() => {
          window.location.href = "/SignIn";
        }, 2000);
      } catch (error) {
        setMessages([
          ...messages,
          { message: "Error registering user.", type: "error" },
        ]);
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4 font-Poppins">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
      >
        <g fill="none" stroke="lightgray" strokeWidth="0.5">
          <circle cx="400" cy="300" r="200" />
          <circle cx="400" cy="300" r="400" />
          <circle cx="400" cy="300" r="600" />
        </g>
      </svg>
      <div className="relative main-container lg:h-[60vh] flex">
        <div className="hidden lg:flex Picture-container relative lg:w-[40rem] bg-[#9BB2F8] lg:bottom-10 rounded-xl justify-center items-center z-0">
          <img
            src="/images/Signup_and_Signin/Signup.svg"
            alt=""
            className="relative w-[30rem]"
          />
        </div>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="form-container relative lg:bottom-10 w-full max-w-md shadow-lg bg-white rounded-xl p-6 z-5"
        >
          <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="relative top-3 space-y-4">
            <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
              <div className="">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
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
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="reEnterPassword"
                placeholder="Confirm Password"
                value={reEnterPassword}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.reEnterPassword && (
                <p className="text-red-600 text-sm">{errors.reEnterPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="relative w-full top-3 p-2 bg-[#0F41EF] text-white rounded hover:bg-[#00115B] transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="relative top-5 text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/SignIn" className="text-faqblue hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
