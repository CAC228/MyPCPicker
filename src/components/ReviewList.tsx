// src/components/ReviewList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IReview } from '../types';

const ReviewList = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${productId}`);
        setReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id}>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
