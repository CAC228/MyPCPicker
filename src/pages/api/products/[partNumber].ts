import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Product from '../../../models/Product';
import Price from '../../../models/Price';
import Store from '../../../models/Store';
import checkAdmin from '../../../middleware/checkAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { partNumber } = req.query;

  if (req.method === 'GET') {
    try {
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
  } else if (req.method === 'PUT') {
    const { name, category, brand, model, description, image_url } = req.body;

    if (!name || !category || !brand || !model || !description || !image_url || !partNumber) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    try {
      const updatedProduct = await Product.findOneAndUpdate(
        { 'specifications.partNumber': partNumber },
        { name, category, brand, model, description, image_url, 'specifications.partNumber': partNumber },
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
      const deletedProduct = await Product.findOneAndDelete({ 'specifications.partNumber': partNumber });
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
};

export default checkAdmin(handler);
