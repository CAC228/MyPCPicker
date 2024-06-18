import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import Favorite from '@/models/Favorite';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { method } = req;

  // Получение данных о пользователе из Clerk
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    switch (method) {
      case 'POST': {
        const { productId } = req.body;

        const favorite = new Favorite({ userId, productId });
        await favorite.save();

        return res.status(200).json({ message: 'Product added to favorites' });
      }
      case 'DELETE': {
        const { productId } = req.body;

        await Favorite.findOneAndDelete({ userId, productId });

        return res.status(200).json({ message: 'Product removed from favorites' });
      }
      case 'GET': {
        const favorites = await Favorite.find({ userId }).populate('productId');
        return res.status(200).json(favorites.map(fav => fav.productId));
      }
      default:
        res.setHeader('Allow', ['POST', 'DELETE', 'GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
