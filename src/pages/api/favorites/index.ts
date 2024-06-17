// src/pages/api/favorites/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Favorite, { IFavorite } from '../../../models/Favorite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const favorite: IFavorite = new Favorite(req.body);
      await favorite.save();
      res.status(201).json({ success: true, data: favorite });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      const favorites = await Favorite.find({ userId }).populate('productId');
      res.status(200).json({ success: true, data: favorites });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { userId, productId } = req.body;
      await Favorite.deleteOne({ userId, productId });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
