// src/types.ts
import mongoose, { Schema, Document } from 'mongoose';
export interface PriceType {
  _id: string;
  store_id: number;
  price: number;
  date: string;
  product_url: string;
  product_partNumber: string;
}

export interface ProductType {
  _id: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  description: string;
  image_url: string;
  specifications: {
    partNumber: string;
    [key: string]: string | number;
  };
  created_at: string;
  updated_at: string;
  prices: PriceType[];
}

export interface IProduct extends ProductType {}

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  productId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IFavorite extends Document {
  userId: string; // Clerk userId
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
}
export interface ISavedBuild {
  _id: mongoose.Types.ObjectId;
  userId: string;
  build: { componentType: string; productId: IProduct }[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}