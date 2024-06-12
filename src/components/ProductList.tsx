import React from 'react';
import { ProductType } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-500">Нет продуктов в этой категории</p>
      )}
    </ul>
  );
};

export default ProductList;
