"use client";

import { Star } from "lucide-react";

const ReviewForm: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center p-4">
      <h2 className="text-2xl font-bold">We Value Your Feedback</h2>
      <p className="text-gray-600 my-2">Leave a review about your experience.</p>
      <div className="flex justify-center gap-1 my-2">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={24} className="text-yellow-400" />
        ))}
      </div>
    </div>
  );
};

export default ReviewForm;
