// src/components/PriceList.tsx
import React from 'react';
import { PriceType } from '../types';

interface PriceListProps {
  prices: PriceType[];
}

const PriceList: React.FC<PriceListProps> = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return <p className="text-gray-500">Нет доступных цен.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Цены</h2>
      <ul className="space-y-2">
        {prices.map((price, index) => (
          <li key={index} className="flex justify-between items-center">
            <p className="text-gray-700">Store {price.store_id}: {price.price} руб.</p>
            <a href={price.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Купить</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceList;
