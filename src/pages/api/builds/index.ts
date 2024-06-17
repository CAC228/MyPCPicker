// src/pages/api/builds/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Build, { IBuild } from '../../../models/Build';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const build: IBuild = new Build(req.body);
      await build.save();
      res.status(201).json({ success: true, data: build });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      const builds = await Build.find({ userId }).populate('components.productId');
      res.status(200).json({ success: true, data: builds });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { buildId } = req.query;
      await Build.findByIdAndDelete(buildId);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
