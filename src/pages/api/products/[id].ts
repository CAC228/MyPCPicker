import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, category, brand, model, description, image_url, partNumber } = req.body;

    if (!name || !category || !brand || !model || !description || !image_url || !partNumber) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, category, brand, model, description, image_url, specifications: { partNumber } },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении продукта', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
      res.status(200).json({ message: 'Продукт успешно удален' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении продукта', error });
    }
  } else {
    res.status(405).json({ message: 'Метод не поддерживается' });
  }
}
