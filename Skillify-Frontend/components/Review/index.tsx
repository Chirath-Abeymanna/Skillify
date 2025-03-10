"use client";

import { Star } from "lucide-react";

const ReviewForm: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">We Value Your Feedback</h2>
      <p className="text-gray-600 my-2">Leave a review about your experience.</p>
      
      <div className="flex justify-center gap-1 my-2">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={24} className="text-yellow-400" />
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Write your review here..."
        rows={3}
      />

      <button className="w-full bg-blue-500 text-white py-2 mt-3 rounded-lg hover:bg-blue-600 transition">
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
