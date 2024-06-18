import React, { useState } from 'react';

interface AddPriceModalProps {
  partNumber: string;
  onClose: () => void;
}

const AddPriceModal: React.FC<AddPriceModalProps> = ({ partNumber, onClose }) => {
  const [storeId, setStoreId] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [date, setDate] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/prices/${partNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ store_id: storeId, price: Number(price), date, product_url: productUrl }),
    });

    if (res.ok) {
      setMessage('Цена успешно добавлена!');
      onClose();
    } else {
      const data = await res.json();
      setMessage(`Ошибка: ${data.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Добавить новую цену</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">ID Магазина</label>
            <input
              type="text"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Цена</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL продукта</label>
            <input
              type="text"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Добавить цену
          </button>
          {message && <p className="mt-4">{message}</p>}
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default AddPriceModal;
