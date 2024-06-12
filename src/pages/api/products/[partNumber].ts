// src/pages/api/products/[partNumber].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';
import Price from '../../../models/Price';
import Store from '../../../models/Store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const { partNumber } = req.query;
    const product = await Product.findOne({ 'specifications.partNumber': partNumber }).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const prices = await Price.find({ product_id: product._id }).lean();
    const stores = await Store.find({}).lean();
    
    const pricesWithStoreInfo = prices.map(price => ({
      ...price,
      store: stores.find(store => store._id === price.store_id),
    }));

    res.status(200).json({ ...product, prices: pricesWithStoreInfo });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
}
