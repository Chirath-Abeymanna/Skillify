"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Star } from "lucide-react";
import "./ReviewForm.css";

const ReviewForm: React.FC = () => {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!session) {
      toast.error("Please sign in to submit a review");
      return false;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return false;
    }

    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters long");
      return false;
    }

    if (profession.trim().length < 2) {
      toast.error("Profession must be at least 2 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: Number(rating),
          comment: comment.trim(),
          profession: profession.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setProfession("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error submitting review"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <h3 className="text-blue text-lg font-normal tracking-widest text-center">
        LEAVE A REVIEW
      </h3>
      <h2 className="text-3xl sm:text-4xl font-bold my-4 sm:my-6 text-center">
        We Value Your Feedback
      </h2>
      {!session ? (
        <div className="text-center mt-4">
          <p className="text-red-500 mb-4">Please sign in to submit a review</p>
          {/* Add your sign in button here */}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={index}
                  size={32}
                  className={`cursor-pointer transition-colors ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(ratingValue)}
                />
              );
            })}
          </div>

          <input
            type="text"
            placeholder="Your profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            minLength={2}
          />

          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
            minLength={10}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
