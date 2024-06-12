// src/app/product/[partNumber]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { IProduct, PriceType } from '../../../types';
import { useBuild } from '../../../context/BuildContext';
import ProductImage from '../../../components/ProductImage';
import ProductDescription from '../../../components/ProductDescription';
import PriceList from '../../../components/PriceList';
import Specifications from '../../../components/Specifications';
import PriceAlert from '../../../components/PriceAlert';

interface ProductDetailPageProps {
  params: {
    partNumber: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [prices, setPrices] = useState<(PriceType & { store: { name: string, url: string } })[]>([]);
  const { addToBuild } = useBuild();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`/api/products?partNumber=${params.partNumber}`);
        setProduct(productResponse.data[0]);

        const pricesResponse = await axios.get(`/api/prices?partNumber=${params.partNumber}`);
        if (pricesResponse.status === 200) {
          setPrices(pricesResponse.data);
        } else {
          setPrices([]);
        }
      } catch (error) {
        console.error('Error fetching product or prices:', error);
      }
    };
    
    fetchProduct();
  }, [params.partNumber]);

  const handleAddToBuild = () => {
    if (product) {
      addToBuild(product);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <Specifications specifications={product.specifications} />
          </div>
          <div className="md:col-span-2">
            <PriceList prices={prices} />
          </div>
          <div>
            <PriceAlert />
          </div>
        </div>
        <div className="mt-8">
        </div>
        <div className="mt-8">
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
