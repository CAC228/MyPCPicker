// src/pages/api/saved-builds/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import SavedBuild from '../../../models/SavedBuild';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (method) {
    case 'GET':
      try {
        const builds = await SavedBuild.find({ userId }).populate('build.productId');
        res.status(200).json(builds);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching builds' });
      }
      break;

    case 'POST':
      try {
        const { build, isPublic } = req.body;
        const newBuild = new SavedBuild({ userId, build, isPublic });
        await newBuild.save();
        res.status(201).json(newBuild);
      } catch (error) {
        res.status(500).json({ message: 'Error saving build' });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
