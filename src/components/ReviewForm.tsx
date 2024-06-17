import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/reviews/${productId}`, { rating, comment });
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Оценка</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 p-2 block w-full border rounded-md"
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Комментарий</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Отправить отзыв
      </button>
    </form>
  );
};

export default ReviewForm;
