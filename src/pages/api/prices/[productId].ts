// src/pages/api/prices/[productId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Price from '../../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { partNumber } = req.query;

  await dbConnect();

  try {
    const prices = await Price.find({ partNumber }).lean();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error });
  }
}

