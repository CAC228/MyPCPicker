// src/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';
import Price from '../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { partNumber, category } = req.query;
    let products;

    if (partNumber) {
      products = await Product.find({ 'specifications.partNumber': partNumber }).lean();
    } else if (category) {
      products = await Product.find({ category }).lean();
    } else {
      products = await Product.find({}).lean();
    }

    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        const prices = await Price.find({ partNumber: product.specifications.partNumber }).lean();
        return { ...product, prices };
      })
    );

    res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
}
