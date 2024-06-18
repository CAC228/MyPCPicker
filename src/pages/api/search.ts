// src/pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    }).limit(10).lean();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
}
