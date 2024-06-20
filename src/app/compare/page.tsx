"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { IProduct } from '@/types';
import ProductComparisonTable from '@/components/ProductComparisonTable';
import { useComparison } from '@/context/ComparisonContext';

const ComparePage = () => {
  const { comparisonList } = useComparison();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productIds = comparisonList.map(product => product.specifications.partNumber);
        const productsResponse = await axios.post('/api/products/compare', { ids: productIds });
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products for comparison:', error);
      }
    };

    fetchProducts();
  }, [comparisonList]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Сравнение товаров</h1>
        <ProductComparisonTable products={products} />
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;
