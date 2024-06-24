// src/pages/api/saved-builds/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import SavedBuild from '../../../models/SavedBuild';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  await dbConnect();

  const { userId } = getAuth(req);

  console.log(`Handling ${method} request for saved builds with userId: ${userId}`);

  switch (method) {
    case 'GET':
      try {
        // Проверка на получение публичных сборок
        if (query.isPublic === 'true') {
          console.log('Fetching public builds');
          const builds = await SavedBuild.find({ isPublic: true }).populate('build.productId');
          return res.status(200).json(builds);
        }

        // Проверка на авторизацию для получения пользовательских сборок
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log(`Fetching builds for userId: ${userId}`);
        const builds = await SavedBuild.find({ userId }).populate('build.productId');
        res.status(200).json(builds);
      } catch (error) {
        console.error('Error fetching builds:', error);
        res.status(500).json({ message: 'Error fetching builds' });
      }
      break;

    case 'POST':
      try {
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const { build, isPublic } = req.body;
        const newBuild = new SavedBuild({ userId, build, isPublic });
        await newBuild.save();
        res.status(201).json(newBuild);
      } catch (error) {
        console.error('Error saving build:', error);
        res.status(500).json({ message: 'Error saving build' });
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
