// src/pages/api/reviews/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Review, { IReview } from '../../../models/Review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const review: IReview = new Review(req.body);
      await review.save();
      res.status(201).json({ success: true, data: review });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'GET') {
    try {
      const reviews = await Review.find({});
      res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
