// src/components/CompareProductsForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { IProduct } from '../types';

const CompareProductsForm = () => {
  const [productId1, setProductId1] = useState('');
  const [productId2, setProductId2] = useState('');
  const [comparisonResult, setComparisonResult] = useState<IProduct[] | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/compare', { productIds: [productId1, productId2] });
      setComparisonResult(response.data.data);
    } catch (error) {
      console.error('Error comparing products:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCompare}>
        <label>Product ID 1:
          <input type="text" value={productId1} onChange={(e) => setProductId1(e.target.value)} />
        </label>
        <label>Product ID 2:
          <input type="text" value={productId2} onChange={(e) => setProductId2(e.target.value)} />
        </label>
        <button type="submit">Compare</button>
      </form>
      {comparisonResult && (
        <div>
          <h2>Comparison Result</h2>
          <div>
            <h3>{comparisonResult[0].name}</h3>
            <p>{comparisonResult[0].specifications.partNumber}</p>
          </div>
          <div>
            <h3>{comparisonResult[1].name}</h3>
            <p>{comparisonResult[1].specifications.partNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareProductsForm;
