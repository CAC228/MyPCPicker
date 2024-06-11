import mongoose, { Schema, Document } from 'mongoose';

interface IPrice extends Document {
  partNumber: string;
  price: string;
  site: string;
  link: string;
}

const PriceSchema: Schema = new Schema({
  partNumber: { type: String, ref: 'Product', required: true },
  price: { type: String, required: true },
  site: { type: String, required: true },
  link: { type: String, required: true },
});

export default mongoose.models.Price || mongoose.model<IPrice>('Price', PriceSchema);
