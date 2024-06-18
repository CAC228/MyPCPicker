import React, { useState } from 'react';
import axios from 'axios';

interface UpdatePriceModalProps {
  partNumber: string;
  storeId: string;
  currentPrice: number;
  currentDate: string;
  currentProductUrl: string;
  onClose: () => void;
}

const UpdatePriceModal: React.FC<UpdatePriceModalProps> = ({ partNumber, storeId, currentPrice, currentDate, currentProductUrl, onClose }) => {
  const [price, setPrice] = useState(currentPrice);
  const [date, setDate] = useState(currentDate);
  const [productUrl, setProductUrl] = useState(currentProductUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/prices/${partNumber}`, {
        storeId,
        price,
        date,
        productUrl,
      });

      onClose();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Редактировать цену</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Цена</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Дата</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL продукта</label>
            <input
              type="url"
              className="w-full px-3 py-2 border rounded"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Сохранить
            </button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePriceModal;
