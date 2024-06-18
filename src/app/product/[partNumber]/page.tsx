"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { IProduct, PriceType, IReview } from '../../../types';
import { useBuild } from '../../../context/BuildContext';
import ProductImage from '../../../components/ProductImage';
import ProductDescription from '../../../components/ProductDescription';
import PriceList from '../../../components/PriceList';
import Specifications from '../../../components/Specifications';
import PriceAlert from '../../../components/PriceAlert';
import { useUser } from '@clerk/nextjs';
import ReviewModal from '../../../components/ReviewModal';

interface ProductDetailPageProps {
  params: {
    partNumber: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [prices, setPrices] = useState<(PriceType & { store: { _id: number, name: string, url: string } })[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { addToBuild } = useBuild();
  const { user } = useUser();
  const userId = user?.id;
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<IReview | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`/api/products?partNumber=${params.partNumber}`);
        setProduct(productResponse.data[0]);

        const pricesResponse = await axios.get(`/api/prices?partNumber=${params.partNumber}`);
        if (pricesResponse.status === 200) {
          const transformedPrices = pricesResponse.data.map((price: PriceType & { store: { _id: number, name: string, url: string } }) => ({
            ...price,
            store: {
              _id: price.store._id,
              name: price.store.name,
              url: price.store.url,
            },
          }));
          setPrices(transformedPrices);
        } else {
          setPrices([]);
        }

        const reviewsResponse = await axios.get(`/api/reviews?productId=${productResponse.data[0]._id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [params.partNumber]);

  const handleAddToFavorites = async () => {
    try {
      await axios.post('/api/favorites', { productId: product?._id });
      alert('Product added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleAddToBuild = () => {
    if (product) {
      addToBuild(product);
    }
  };

  const handleAddReview = async (rating: number, comment: string) => {
    try {
      const response = await axios.post('/api/reviews', {
        productId: product?._id,
        rating,
        comment,
      });
      setReviews([...reviews, response.data]);
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleEditReview = async (reviewId: string, rating: number, comment: string) => {
    try {
      const response = await axios.put('/api/reviews', {
        reviewId,
        rating,
        comment,
      });
      setReviews(reviews.map(review => (review._id.toString() === reviewId ? response.data : review)));
      setIsReviewModalOpen(false);
      setCurrentReview(null);
    } catch (error) {
      console.error('Error editing review:', error);
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:flex-row">
        <div className="flex flex-col md:flex-row gap-6">
          <ProductImage imageUrl={product.image_url} name={product.name} />
          <ProductDescription name={product.name} description={product.description} handleAddToBuild={handleAddToBuild} />
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddToFavorites}>
            Добавить в избранное
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <Specifications specifications={product.specifications} />
          </div>
          <div className="md:col-span-2">
            <PriceList partNumber={params.partNumber} prices={prices} />
          </div>
          <div>
            <PriceAlert />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Отзывы</h2>
          {userId && (
            <button onClick={() => setIsReviewModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Добавить отзыв
            </button>
          )}
          <ul className="space-y-4 mt-4">
            {reviews.map(review => (
              <li key={review._id.toString()} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <div>
                  <div className="text-lg font-bold">{review.rating} звёзд</div>
                  <p>{review.comment}</p>
                </div>
                {userId === review.userId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentReview(review);
                        setIsReviewModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Редактировать
                    </button>
                    <button onClick={() => handleDeleteReview(review._id.toString())} className="text-red-600 hover:underline">
                      Удалить
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={(currentReview ? handleEditReview : handleAddReview) as (rating: number, comment: string) => void}
        initialRating={currentReview?.rating}
        initialComment={currentReview?.comment}
      />
    </div>
  );
};

export default ProductDetailPage;
