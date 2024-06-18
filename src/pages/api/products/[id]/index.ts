import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongoose';
import Product from '../../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id).lean();
      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении продукта', error });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}
