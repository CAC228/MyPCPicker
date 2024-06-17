// src/types.ts
export interface PriceType {
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

export interface IReview {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IComponent {
  productId: {
    _id: string;
    name: string;
  };
  type: string;
}

export interface IBuild {
  _id: string;
  userId: string;
  components: IComponent[];
}

export interface IUser {
  id: string;
}