"use client";

import React from 'react';
import { useCart } from '../context/CartContext';

type PriceType = {
  price: string;
  site: string;
  link: string;
};

type ProductCardProps = {
  product: {
    _id: string;
    name: string;
    specs: string;
    url: string;
    type: string;
    image: string;
    partNumber: string;
    prices: PriceType[];
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.specs}</p>
      <div className="space-y-2 mb-4">
        {product.prices.map((price, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{price.site}</span>
            <a href={price.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {price.price}
            </a>
          </div>
        ))}
      </div>
      <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;
