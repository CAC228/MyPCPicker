import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { userId } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reviews/${productId}`, { ...newReview, userId });
      setNewReview({ rating: 0, comment: '' });
      const response = await axios.get(`/api/reviews/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Отзывы</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Оценка</label>
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
            min="1"
            max="5"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Комментарий</label>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Отправить отзыв
        </button>
      </form>
      <ul>
        {reviews.map((review) => (
          <li key={review._id} className="border-t py-2">
            <div>
              <strong>Оценка: {review.rating}</strong>
            </div>
            <div>{review.comment}</div>
            <div className="text-sm text-gray-500">Дата: {new Date(review.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReviews;
