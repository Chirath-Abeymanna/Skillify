"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", { rating, comment });
  };

  return (
    <div className="max-w-md mx-auto text-center p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">We Value Your Feedback</h2>
      <p className="text-gray-600 my-2">Leave a review about your experience.</p>

      {/* Interactive Star Rating */}
      <div className="flex justify-center gap-1 my-2">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Star
              key={index}
              size={32}
              className={`cursor-pointer transition ${
                ratingValue <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(ratingValue)}
            />
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
