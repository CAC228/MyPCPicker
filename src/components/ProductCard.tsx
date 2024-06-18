import React, { useState } from 'react';
import Link from 'next/link';
import { ProductType } from '../types';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const minPrice = Math.min(...product.prices.map(price => price.price));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product._id}`} legacyBehavior>
        <a className="block p-4 cursor-pointer">
          <div className="w-full h-96 flex items-center justify-center bg-gray-100">
            <img src={product.image_url} alt={product.name} className="object-contain h-full w-full" />
          </div>
          <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-900 font-bold mt-2">{minPrice} руб.</p>
        </a>
      </Link>
      <div className="flex justify-between p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsEditModalOpen(true)}
        >
          Редактировать
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Удалить
        </button>
      </div>
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProductModal
          productId={product._id}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
