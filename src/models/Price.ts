import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPrice extends Document {
  partNumber: string;
  store_id: number; // Изменено на Number
  price: number;
  date: Date;
  product_url: string;
}

const PriceSchema: Schema = new Schema({
  partNumber: { type: String, required: true },
  store_id: { type: Number, ref: 'Store', required: true }, // Используем Number для store_id
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  product_url: { type: String, required: true },
});

const Price: Model<IPrice> = mongoose.models.Price || mongoose.model<IPrice>('Price', PriceSchema);
export default Price;
