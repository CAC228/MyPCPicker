"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '../types';

interface ComparisonContextProps {
  comparisonList: IProduct[];
  addToComparison: (product: IProduct) => void;
  removeFromComparison: (productId: string) => void;
}

const ComparisonContext = createContext<ComparisonContextProps | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<IProduct[]>([]);

  const addToComparison = (product: IProduct) => {
    setComparisonList(prev => [...prev, product]);
    alert('Product added to comparison');
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList(prev => prev.filter(product => product._id !== productId));
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};
