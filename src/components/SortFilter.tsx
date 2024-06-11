// src/components/SortFilter.tsx
import { useState } from 'react';
import React from 'react';

interface SortFilterProps {
  onSortChange: (sortOption: string) => void;
  onFilterChange: (filterOption: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortChange, onFilterChange }) => {
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex justify-between mb-4">
      <div>
        <label className="mr-2">Сортировка:</label>
        <select value={sortOption} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
          <option value="">Выберите</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>
      </div>
      <div>
        <label className="mr-2">Фильтр:</label>
        <select value={filterOption} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
          <option value="">Выберите</option>
          <option value="site-citilink">Ситилинк</option>
          <option value="site-dns">DNS</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
