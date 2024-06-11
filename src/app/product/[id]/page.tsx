'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useCart } from '../../../context/CartContext';

interface PriceType {
  price: string;
  site: string;
  link: string;
}

interface ProductType {
  _id: string;
  name: string;
  specs: string;
  url: string;
  type: string;
  image: string;
  partNumber: string;
  prices: PriceType[];
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [prices, setPrices] = useState<PriceType[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(`/api/products/${params.id}`);
        const productData = productResponse.data;
        setProduct(JSON.parse(JSON.stringify(productData)));

        const priceResponse = await axios.get(`/api/prices?partNumber=${productResponse.data.partNumber}`);
        const pricesData = priceResponse.data;
        setPrices(JSON.parse(JSON.stringify(pricesData)));
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md mb-4" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.specs}</p>
            <button 
              onClick={handleAddToCart} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
              Добавить в сборку
            </button>
            <h2 className="text-2xl font-bold mb-4">Цены:</h2>
            <ul className="space-y-2">
              {prices.map((price, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <p className="text-gray-700">{price.site}: {price.price}</p>
                  <a href={price.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Купить
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
