'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/router';
import Product from '../../../models/Product';
import Price from '../../../models/Price';
import dbConnect from '../../../lib/mongoose';

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

interface Params {
  params: {
    id: string;
  };
}

const ProductDetailPage = async ({ params }: Params) => {
  await dbConnect();

  const productData: ProductType | null = await Product.findById(params.id).lean();
  if (!productData) return { notFound: true };

  const pricesData: PriceType[] = await Price.find({ partNumber: productData.partNumber }).lean();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
        <p className="text-gray-700 mb-4">{productData.specs}</p>
        <ul className="mb-4 space-y-2">
          {pricesData.map((price, index) => (
            <li key={index} className="flex justify-between items-center">
              <p className="text-gray-700">{price.site}: {price.price}</p>
              <a href={price.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Купить
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
