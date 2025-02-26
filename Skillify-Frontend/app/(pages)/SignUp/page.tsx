"use client";

import { useState } from "react";
import Link from "next/link";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    } else {
      newErrors.gender = "";
    }

    if (!formData.age || isNaN(Number(formData.age))) {
      newErrors.age = "Valid age is required";
      valid = false;
    } else {
      newErrors.age = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("User Registered:", formData);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
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
      <div className="relative w-full max-w-md shadow-lg bg-white rounded-xl p-6">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm">{errors.gender}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#0F41EF] text-white rounded hover:bg-[#2d41a0] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/SignIn" className="text-faqblue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
