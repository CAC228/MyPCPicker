import React, { useState } from 'react';
import { IProduct } from '../types';

interface ProductComparisonTableProps {
  products: IProduct[];
}

const categoryTranslations = {
  gpu: 'Видеокарты',
  cpu: 'Процессоры',
  motherboards: 'Материнские платы',
  ram: 'Оперативная память',
  storage: 'Накопители',
  powerSupplies: 'Блоки питания',
  cases: 'Корпуса',
  cpuCoolers: 'Охлаждение CPU',
};

const ProductComparisonTable: React.FC<ProductComparisonTableProps> = ({ products }) => {
  if (products.length === 0) {
    return <div>No products to compare</div>;
  }

  const categories = Array.from(new Set(products.map(product => product.category)));
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const getMinPrice = (prices) => {
    if (prices.length === 0) return null;
    return prices.reduce((min, price) => (price.price < min.price ? price : min));
  };

  const selectedProducts = products.filter(product => product.category === selectedCategory);

  const specifications = Array.from(
    new Set(selectedProducts.flatMap(product => Object.keys(product.specifications)))
  );

  const getProductCountByCategory = (category: string) => {
    return products.filter(product => product.category === category).length;
  };

  const minPrices = selectedProducts.map(product => getMinPrice(product.prices)?.price).filter(Boolean);
  const priceDifference = minPrices.length > 1 ? Math.max(...minPrices) - Math.min(...minPrices) : null;

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {categoryTranslations[category]} {getProductCountByCategory(category)}
          </button>
        ))}
      </div>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Продукт</th>
            {selectedProducts.map(product => (
              <th key={product._id.toString()} className="border border-gray-200 p-2">{product.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-2">Минимальная цена</td>
            {selectedProducts.map(product => {
              const minPrice = getMinPrice(product.prices);
              return (
                <td key={product._id.toString()} className="border border-gray-200 p-2">
                  {minPrice ? (
                    <div>
                      <div>{minPrice.price} ₽</div>
                      <a href={minPrice.product_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {minPrice.store.name}
                      </a>
                    </div>
                  ) : (
                    <div>Нет данных</div>
                  )}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">Разница в цене</td>
            <td colSpan={selectedProducts.length} className="border border-gray-200 p-2 text-center">
              {priceDifference !== null ? (
                <div>{priceDifference} ₽</div>
              ) : (
                <div>Нет данных для расчета</div>
              )}
            </td>
          </tr>
          {specifications.map(spec => (
            <tr key={spec}>
              <td className="border border-gray-200 p-2">{spec}</td>
              {selectedProducts.map(product => (
                <td key={product._id.toString()} className="border border-gray-200 p-2">
                  {product.specifications[spec]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductComparisonTable;
