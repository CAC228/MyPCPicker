import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, category, brand, model, description, image_url, partNumber } = req.body;

    if (!name || !category || !brand || !model || !description || !image_url || !partNumber) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
      const newProduct = new Product({
        name,
        category,
        brand,
        model,
        description,
        image_url,
        specifications: { partNumber },
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении продукта', error });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}
