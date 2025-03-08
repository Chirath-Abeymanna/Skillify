import { useState, useEffect } from "react";
import Head from "next/head";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from local storage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(savedReviews);
  }, []);

  // Save reviews whenever they change
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const rating = parseInt(formData.get("rating") as string);
    const review = formData.get("review") as string;

    const newReview: Review = { id: Date.now(), name, rating, review };
    setReviews([newReview, ...reviews]);
    e.currentTarget.reset();
  };

  return (
    <>
      <Head>
        <title>Rating & Review Page</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-xl font-bold text-center mb-4">Product Reviews</h1>

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              required
              aria-label="Enter your name"
            />
            <select name="rating" className="w-full p-2 border rounded" required aria-label="Select rating">
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {"⭐".repeat(num)}
                </option>
              ))}
            </select>
            <textarea
              name="review"
              placeholder="Your Review"
              className="w-full p-2 border rounded"
              required
              aria-label="Enter your review"
            />
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center">No reviews yet.</p>
            ) : (
              reviews.map(({ id, name, rating, review }) => (
                <div key={id} className="p-4 border-b bg-gray-50 rounded-lg my-2 shadow-sm">
                  <strong>{name}</strong> - {"⭐".repeat(rating)}
                  <p className="text-gray-600 mt-1">{review}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}