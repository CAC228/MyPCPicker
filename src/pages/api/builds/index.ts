import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import SavedBuild from '@/models/SavedBuild';
import { getAuth } from '@clerk/nextjs/server';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      const builds = await SavedBuild.find({ userId });
      res.status(200).json(builds);
      break;
    case 'POST':
      const { build } = req.body;
      const newBuild = new SavedBuild({ userId, build });
      await newBuild.save();
      res.status(201).json(newBuild);
      break;
    case 'DELETE':
      const { id } = req.body;
      await SavedBuild.deleteOne({ _id: new ObjectId(id), userId });
      res.status(200).json({ message: 'Build removed' });
      break;
    case 'PUT':
      const { buildId, isPublic } = req.body;
      await SavedBuild.updateOne({ _id: new ObjectId(buildId), userId }, { $set: { isPublic } });
      res.status(200).json({ message: 'Build updated' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
