// src/components/Sort.tsx
import React from 'react';

interface SortProps {
  sortType: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = ({ sortType, onChange }) => {
  return (
    <div className="flex items-center">
      <label className="mr-2">Сортировка:</label>
      <select value={sortType} onChange={onChange} className="border p-1 rounded">
        <option value="name">По имени</option>
        <option value="price">По цене</option>
      </select>
    </div>
  );
};

export default Sort;
