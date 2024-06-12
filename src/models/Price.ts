// src/models/Price.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPrice extends Document {
  product_id: string;
  store_id: string;
  price: number;
  date: Date;
  product_url: string;
}

const PriceSchema: Schema = new Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  product_url: { type: String, required: true },
});

const Price: Model<IPrice> = mongoose.models.Price || mongoose.model<IPrice>('Price', PriceSchema);
export default Price;
