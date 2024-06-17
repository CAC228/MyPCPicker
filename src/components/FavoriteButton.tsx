// src/components/FavoriteButton.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteButton = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(`/api/favorites?userId=user123`);
        const favorites = response.data.data;
        setIsFavorite(favorites.some((fav) => fav.productId._id === productId));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavorite();
  }, [productId]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete('/api/favorites', { data: { userId: 'user123', productId } });
      } else {
        await axios.post('/api/favorites', { userId: 'user123', productId });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <button onClick={handleToggleFavorite} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    </button>
  );
};

export default FavoriteButton;
