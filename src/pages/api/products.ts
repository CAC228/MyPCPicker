// src/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';
import Price from '../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const products = await Product.find({});
    const productsWithPrices = await Promise.all(products.map(async (product) => {
      const prices = await Price.find({ productId: product._id });
      return { ...product.toObject(), prices };
    }));

    res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
}
