"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '@clerk/nextjs';
import { IProduct, IReview, ISavedBuild } from '../../types';
import Link from 'next/link';
import ReviewModal from '../../components/ReviewModal';
import BuildModal from '../../components/BuildModal';


const Dashboard = () => {
  const [favorites, setFavorites] = useState<IProduct[]>([]);
  const [reviews, setReviews] = useState<(IReview & { product?: IProduct })[]>([]);
  const [savedBuilds, setSavedBuilds] = useState<ISavedBuild[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<IReview | null>(null);
  const [currentBuild, setCurrentBuild] = useState<ISavedBuild | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        const favoriteProducts = response.data.map((fav: any) => fav.productId);
        setFavorites(favoriteProducts);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews?userId=${userId}`);
        const reviewsWithProduct = response.data.map((review: IReview) => ({
          ...review,
          product: review.productId
        }));
        setReviews(reviewsWithProduct);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (userId) {
      fetchFavorites();
      fetchReviews();
      fetchSavedBuilds();
    }
  }, [userId]);

  const fetchSavedBuilds = async () => {
    try {
      const response = await axios.get('/api/saved-builds');
      setSavedBuilds(response.data);
    } catch (error) {
      console.error('Error fetching saved builds:', error);
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    try {
      await axios.delete('/api/favorites', { data: { productId } });
      setFavorites(favorites.filter(product => product._id.toString() !== productId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleEditReview = (review: IReview) => {
    setCurrentReview(review);
    setIsReviewModalOpen(true);
  };

  const handleUpdateReview = async (rating: number, comment: string) => {
    try {
      if (currentReview) {
        const response = await axios.put('/api/reviews', { reviewId: currentReview._id.toString(), rating, comment });
        setIsReviewModalOpen(false);
        setCurrentReview(null);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await axios.delete('/api/reviews', { data: { reviewId } });
      setReviews(reviews.filter(review => review._id.toString() !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleViewBuild = (build: ISavedBuild) => {
    setCurrentBuild(build);
    setIsBuildModalOpen(true);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>
        <h2 className="text-2xl mb-4">Избранные товары</h2>
        <ul className="space-y-4">
          {favorites.length > 0 ? (
            favorites.map(product => (
              <li key={product._id.toString()} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <Link href={`/product/${product.specifications.partNumber}`} legacyBehavior>
                  <a className="text-lg font-bold text-blue-600 hover:underline">
                    {product.name}
                  </a>
                </Link>
                <button 
                  onClick={() => handleRemoveFavorite(product._id.toString())}
                  className="bg-red-500 text-white-600 hover:bg-gray-700 hover:underline"
                >
                  Удалить
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Нет избранных товаров.</p>
          )}
        </ul>
        <h2 className="text-2xl mt-8 mb-4">Мои отзывы</h2>
        <ul className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <li key={review._id.toString()} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <div>
                  {review.product ? (
                    <Link href={`/product/${review.product.specifications.partNumber}`} legacyBehavior>
                      <a className="text-lg font-bold text-blue-600 hover:underline">
                        {review.product.name}
                      </a>
                    </Link>
                  ) : (
                    <p className="text-lg font-bold text-gray-500">Продукт удален</p>
                  )}
                  <div className="text-lg font-bold">{review.rating} звёзд</div>
                  <p>{review.comment}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-600 hover:underline"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id.toString())}
                    className="text-red-600 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Нет отзывов.</p>
          )}
        </ul>
        <h2 className="text-2xl mt-8 mb-4">Мои сборки</h2>
        <ul className="space-y-4">
          {savedBuilds.length > 0 ? (
            savedBuilds.map(build => (
              <li key={build._id.toString()} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <span>Сборка #{build._id.toString()}</span>
                <button 
                  onClick={() => handleViewBuild(build)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Просмотр
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">Нет сохраненных сборок.</p>
          )}
        </ul>
      </main>
      <Footer />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleUpdateReview}
        initialRating={currentReview?.rating}
        initialComment={currentReview?.comment}
      />
    <BuildModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        build={currentBuild}
      />
    </div>
  );
};

export default Dashboard;
