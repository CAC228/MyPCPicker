// context/BuildContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ProductType } from '../types';

type BuildContextType = {
  build: { [key: string]: ProductType };
  addToBuild: (product: ProductType) => void;
  removeFromBuild: (type: string) => void;
};

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider = ({ children }: { children: ReactNode }) => {
  const [build, setBuild] = useState<{ [key: string]: ProductType }>({});

  const addToBuild = (product: ProductType) => {
    setBuild((prevBuild) => ({ ...prevBuild, [product.category]: product }));
  };

  const removeFromBuild = (category: string) => {
    setBuild((prevBuild) => {
      const newBuild = { ...prevBuild };
      delete newBuild[category];
      return newBuild;
    });
  };

  return (
    <BuildContext.Provider value={{ build, addToBuild, removeFromBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
};
