import React from 'react';

interface ProductDescriptionProps {
  name: string;
  description: string;
  handleAddToBuild: () => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ name, description, handleAddToBuild }) => (
  <div className="w-full p-4">
    <h1 className="text-3xl font-bold mb-4">{name}</h1>
    <p className="text-gray-700 mb-4">{description}</p>
    <button
      onClick={handleAddToBuild}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    >
      Добавить в сборку
    </button>
  </div>
);

export default ProductDescription;
