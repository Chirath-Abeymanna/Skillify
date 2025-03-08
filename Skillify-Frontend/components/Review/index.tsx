"use client";

import { useState } from "react";

const ReviewForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, comment });
  };

  return (
    <div className="bg-reviewGlass my-32 p-8 rounded-3xl shadow-lg backdrop-blur-md bg-opacity-40 max-w-2xl mx-auto">
      <h3 className="text-blue text-lg font-normal tracking-widest text-center">
        LEAVE A REVIEW
      </h3>
      <h2 className="text-4xl sm:text-5xl font-bold my-6 text-center">
        We Value Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          className="w-full p-4 text-black rounded-xl bg-lightgrey focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-4 text-black rounded-xl bg-lightgrey focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="w-full p-4 text-black rounded-xl bg-lightgrey focus:outline-none focus:ring-2 focus:ring-blue"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full text-xl text-white font-semibold text-center rounded-xl bg-blue hover:bg-btnblue py-3 transition-all"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;