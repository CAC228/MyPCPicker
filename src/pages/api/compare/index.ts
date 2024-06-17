// src/pages/api/compare/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import Product, { IProduct } from '@/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { productIds } = req.body;
      const products: IProduct[] = await Product.find({ _id: { $in: productIds } });
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
