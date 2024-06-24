"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ProductType } from '../types';

type BuildContextType = {
  build: { [key: string]: ProductType };
  addToBuild: (product: ProductType) => void;
  removeFromBuild: (type: string) => void;
  setBuild: (build: { [key: string]: ProductType }) => void;
};

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider = ({ children }: { children: ReactNode }) => {
  const [build, setBuildState] = useState<{ [key: string]: ProductType }>({});

  const addToBuild = (product: ProductType) => {
    setBuildState((prevBuild) => ({ ...prevBuild, [product.category]: product }));
  };

  const removeFromBuild = (category: string) => {
    setBuildState((prevBuild) => {
      const newBuild = { ...prevBuild };
      delete newBuild[category];
      return newBuild;
    });
  };

  const setBuild = (newBuild: { [key: string]: ProductType }) => {
    setBuildState(newBuild);
  };

  return (
    <BuildContext.Provider value={{ build, addToBuild, removeFromBuild, setBuild }}>
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
