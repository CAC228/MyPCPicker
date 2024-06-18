import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Price from '../../models/Price';
import Store from '../../models/Store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { partNumber } = req.query;
    if (!partNumber) {
      return res.status(400).json({ message: 'partNumber is required' });
    }

    const prices = await Price.find({ partNumber }).lean().exec();

    if (prices.length === 0) {
      return res.status(404).json({ message: 'Prices not found' });
    }

    // Transform the prices to include store details
    const transformedPrices = await Promise.all(prices.map(async price => {
      const store = await Store.findById(price.store_id).lean().exec();
      return {
        ...price,
        store,
      };
    }));

    res.status(200).json(transformedPrices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices' });
  }
}
