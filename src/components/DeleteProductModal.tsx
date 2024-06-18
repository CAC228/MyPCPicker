import React, { useState } from 'react';

interface DeleteProductModalProps {
  partNumber: string;
  onClose: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ partNumber, onClose }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const res = await fetch(`/api/products/${partNumber}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setMessage('Продукт успешно удален!');
      onClose();
    } else {
      const data = await res.json();
      setMessage(`Ошибка: ${data.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Удалить продукт</h2>
        <p>Вы уверены, что хотите удалить этот продукт?</p>
        <div className="flex justify-end mt-4">
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Удалить
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Отмена
          </button>
        </div>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteProductModal;
