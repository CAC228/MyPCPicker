import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  specs: string;
  url: string;
  type: string;
  image: string;
  partNumber: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  specs: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  partNumber: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
