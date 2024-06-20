// api/products/compare.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';
import Price from '../../../models/Price';
import Store from '../../../models/Store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const products = await Product.find({ 'specifications.partNumber': { $in: ids } }).lean();
    const partNumbers = products.map(product => product.specifications.partNumber);

    const prices = await Price.find({ partNumber: { $in: partNumbers } }).lean();
    const stores = await Store.find({}).lean();

    const pricesWithStoreInfo = prices.map(price => ({
      ...price,
      store: stores.find(store => store._id === price.store_id)
    }));

    const productWithPrices = products.map(product => {
      const productPrices = pricesWithStoreInfo.filter(price => price.partNumber === product.specifications.partNumber);
      return { ...product, prices: productPrices };
    });

    res.status(200).json(productWithPrices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products for comparison' });
  }
}
