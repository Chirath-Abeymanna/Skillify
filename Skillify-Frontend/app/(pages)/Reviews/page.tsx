"use client";
import React, { useState } from 'react';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState<string[]>([]);
    const [newReview, setNewReview] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.trim()) {
            setReviews([...reviews, newReview]);
            setNewReview('');
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
            <h1>Reviews</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review here"
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>All Reviews</h2>
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewsPage;
