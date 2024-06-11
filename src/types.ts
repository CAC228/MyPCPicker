// src/types.ts

export type PriceType = {
    price: string;
    site: string;
    link: string;
  };
  
  export type ProductType = {
    _id: string;
    name: string;
    specs: string;
    url: string;
    type: string;
    image: string;
    prices: PriceType[];
  };
  