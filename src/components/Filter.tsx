// src/components/Filter.tsx
import React from 'react';

interface FilterProps {
  brands: string[];
  selectedBrand: string;
  onBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const Filter: React.FC<FilterProps> = ({
  brands,
  selectedBrand,
  onBrandChange,
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label>
        Бренд:
        <select value={selectedBrand} onChange={onBrandChange} className="ml-2 border p-1 rounded">
          <option value="all">Все</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>
      <label>
        Цена от:
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => onPriceChange(e, 0)}
          className="ml-2 border p-1 rounded"
        />
      </label>
      <label>
        Цена до:
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => onPriceChange(e, 1)}
          className="ml-2 border p-1 rounded"
        />
      </label>
    </div>
  );
};

export default Filter;
