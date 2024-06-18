import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Review from '../../../models/Review';
import Product from '../../../models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { userId } = req.query;
        const reviews = await Review.find({ userId }).populate('productId').lean();
        const reviewsWithProduct = reviews.map(review => ({
          ...review,
          product: review.productId,
        }));
        res.status(200).json(reviewsWithProduct);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка получения отзывов' });
      }
      break;
    case 'POST':
      try {
        const { rating, comment, userId, productId } = req.body;
        const review = new Review({ rating, comment, userId, productId });
        await review.save();
        res.status(201).json(review);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка создания отзыва' });
      }
      break;
    case 'PUT':
      try {
        const { reviewId, rating, comment } = req.body;
        const review = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        res.status(200).json(review);
      } catch (error) {
        res.status(500).json({ message: 'Ошибка обновления отзыва' });
      }
      break;
    case 'DELETE':
      try {
        const { reviewId } = req.body;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Отзыв удален' });
      } catch (error) {
        res.status(500).json({ message: 'Ошибка удаления отзыва' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Метод ${method} не разрешен`);
      break;
  }
}
