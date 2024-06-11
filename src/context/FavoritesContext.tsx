// src/context/FavoritesContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type ProductType = {
  _id: string;
  name: string;
  specs: string;
  url: string;
  type: string;
  image: string;
  partNumber: string;
  prices: any[];
};

type FavoritesContextType = {
  favorites: ProductType[];
  addToFavorites: (product: ProductType) => void;
  removeFromFavorites: (productId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  const addToFavorites = (product: ProductType) => {
    setFavorites([...favorites, product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(favorites.filter(product => product._id !== productId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
