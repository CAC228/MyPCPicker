import React, { useState } from 'react';
import { PriceType } from '../types';
import AddPriceModal from './AddPriceModal';
import UpdatePriceModal from './UpdatePriceModal';
import { useUser } from '@clerk/nextjs';

interface PriceListProps {
  partNumber: string;
  prices: (PriceType & { store: { _id: number, name: string, url: string } })[];
}

const PriceList: React.FC<PriceListProps> = ({ partNumber, prices }) => {
  const { user } = useUser();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<null | {
    storeId: string; // Изменено на строку
    price: number;
    date: string;
    productUrl: string;
  }>(null);
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Цены</h3>
      {isAdmin && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          Добавить цену
        </button>
      )}
      <ul className="list-disc pl-5">
        {prices.map((price) => (
          <li key={price._id} className="mb-2">
            <a
              href={price.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {price.price} руб. - {price.store.name}
            </a>
            {isAdmin && (
              <button
                className="ml-2 text-blue-500"
                onClick={() => setIsUpdateModalOpen({
                  storeId: price.store._id.toString(), // Преобразуем storeId в строку
                  price: price.price,
                  date: price.date.split('T')[0],
                  productUrl: price.product_url,
                })}
              >
                Редактировать
              </button>
            )}
          </li>
        ))}
      </ul>
      {isAddModalOpen && (
        <AddPriceModal
          partNumber={partNumber}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {isUpdateModalOpen && (
        <UpdatePriceModal
          partNumber={partNumber}
          storeId={isUpdateModalOpen.storeId}
          currentPrice={isUpdateModalOpen.price}
          currentDate={isUpdateModalOpen.date}
          currentProductUrl={isUpdateModalOpen.productUrl}
          onClose={() => setIsUpdateModalOpen(null)}
        />
      )}
    </div>
  );
};

export default PriceList;
