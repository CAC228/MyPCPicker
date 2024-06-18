import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import Product from '../../models/Product';
import Price from '../../models/Price';
import checkAdmin from '../../middleware/checkAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { partNumber, category } = req.query;
      let products;

      if (partNumber) {
        products = await Product.find({ 'specifications.partNumber': partNumber }).lean();
      } else if (category) {
        products = await Product.find({ category }).lean();
      } else {
        products = await Product.find({}).lean();
      }

      const productsWithPrices = await Promise.all(
        products.map(async (product) => {
          const prices = await Price.find({ partNumber: product.specifications.partNumber }).lean();
          return { ...product, prices };
        })
      );

      res.status(200).json(productsWithPrices);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  } else if (req.method === 'POST') {
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
};

export default handler;
