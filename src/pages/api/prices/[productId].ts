// src/pages/api/prices/[productId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Price from '../../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { productId } = req.query;

  try {
    const prices = await Price.find({ productId });
    res.status(200).json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices' });
  }
}
