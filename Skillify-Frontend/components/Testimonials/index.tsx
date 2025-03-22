"use client";
import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Review {
  _id: string; // Add this to track unique reviews
  userName: string;
  profession: string;
  comment: string;
  rating: number;
}

const MultipleItems: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          // Take only first 4 unique reviews
          const uniqueReviews = Array.from(
            new Set(data.reviews.map((r: Review) => r._id))
          )
            .map((id) => data.reviews.find((r: Review) => r._id === id))
            .slice(0, 4);
          setReviews(uniqueReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-testimonial py-20" id="testimonial-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl sm:text-6xl font-bold text-black">
            See what others are saying
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div key={review._id} className="relative">
              <div className="bg-white shadow-lg rounded-2xl p-6">
                <Image
                  src={`/images/testimonial/user${(i % 3) + 1}.svg`}
                  alt="user"
                  width={50}
                  height={50}
                  className="rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {review.comment}
                </p>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-gray-500">{review.profession}</p>
                  </div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className="h-5 w-5 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultipleItems;
