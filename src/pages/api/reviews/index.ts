import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Review from '../../../models/Review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { productId } = req.query;
        if (!productId) {
          return res.status(400).json({ message: 'productId обязателен' });
        }
        const reviews = await Review.find({ productId }).populate('productId').lean();
        res.status(200).json(reviews);
      } catch (error) {
        console.error('Ошибка получения отзывов:', error);
        res.status(500).json({ message: 'Ошибка получения отзывов' });
      }
      break;
    case 'POST':
      try {
        const { rating, comment, userId, productId } = req.body;
        if (!rating || !comment || !userId || !productId) {
          return res.status(400).json({ message: 'Все поля обязательны' });
        }

        console.log('Создание отзыва с данными:', { rating, comment, userId, productId });

        const review = new Review({ rating, comment, userId, productId });
        await review.save();
        res.status(201).json(review);
      } catch (error) {
        console.error('Ошибка создания отзыва:', error);
        res.status(500).json({ message: 'Ошибка создания отзыва' });
      }
      break;
    case 'PUT':
      try {
        const { reviewId, rating, comment } = req.body;
        if (!reviewId || !rating || !comment) {
          return res.status(400).json({ message: 'Все поля обязательны' });
        }

        console.log('Обновление отзыва с данными:', { reviewId, rating, comment });

        const review = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        res.status(200).json(review);
      } catch (error) {
        console.error('Ошибка обновления отзыва:', error);
        res.status(500).json({ message: 'Ошибка обновления отзыва' });
      }
      break;
    case 'DELETE':
      try {
        const { reviewId } = req.body;
        if (!reviewId) {
          return res.status(400).json({ message: 'reviewId обязателен' });
        }

        console.log('Удаление отзыва с id:', reviewId);

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Отзыв удален' });
      } catch (error) {
        console.error('Ошибка удаления отзыва:', error);
        res.status(500).json({ message: 'Ошибка удаления отзыва' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Метод ${method} не разрешен`);
      break;
  }
}
