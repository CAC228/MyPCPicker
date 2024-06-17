// src/pages/compare.tsx (новая страница сравнения продуктов)
"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompareProductsForm from '../components/CompareProductsForm';

const ComparePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Сравнение продуктов</h1>
        <CompareProductsForm />
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;
