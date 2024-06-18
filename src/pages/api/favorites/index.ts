import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Favorite from '../../../models/Favorite';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, userId);
    case 'POST':
      return handlePost(req, res, userId);
    case 'DELETE':
      return handleDelete(req, res, userId);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const favorites = await Favorite.find({ userId }).populate('productId');
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const newFavorite = new Favorite({
      userId,
      productId,
      createdAt: new Date(),
    });

    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: string) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    await Favorite.deleteOne({ userId, productId });
    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite' });
  }
}
