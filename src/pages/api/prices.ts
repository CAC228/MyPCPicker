// src/pages/api/prices.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Price from '../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { partNumber } = req.query;
    if (!partNumber) {
      return res.status(400).json({ message: 'partNumber is required' });
    }

    const prices = await Price.find({ partNumber }).lean();

    if (prices.length === 0) {
      return res.status(404).json({ message: 'Prices not found' });
    }

    res.status(200).json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices' });
  }
}
