// src/pages/api/reviews/[productId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Review from '../../../models/Review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const reviews = await Review.find({ productId });
      res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
