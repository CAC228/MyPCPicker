// src/components/SearchDropdown.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface SearchResult {
  _id: string;
  name: string;
  specifications: {
    partNumber: string;
  };
}

const SearchDropdown: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {
      try {
        const response = await axios.get(`/api/search?query=${event.target.value}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Поиск..."
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && query && (
        <div className="absolute top-12 left-0 right-0 text-blue-600 bg-white border rounded shadow-lg z-10">
          <ul>
            {results.map((result) => (
              <li key={result._id} className="border-b p-2">
                <Link href={`/product/${result.specifications.partNumber}`} legacyBehavior>
                  <a className="text-blue-600 hover:underline">
                    {result.name}
                  </a>
                </Link>
              </li>
            ))}
            {results.length === 0 && (
              <li className="p-2 text-gray-500">Нет результатов</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
