// src/components/ReviewForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }: { productId: string }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', { productId, userId: 'user123', rating, comment });
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <label>Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
