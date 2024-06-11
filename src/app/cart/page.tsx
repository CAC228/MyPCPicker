"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Корзина</h1>
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product._id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.specs}</p>
                  <a href={product.url} className="text-blue-600 hover:underline mb-2 block">Подробнее</a>
                </div>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Ваша корзина пуста</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
