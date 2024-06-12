// src/models/Product.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  productModel: string;
  description: string;
  image_url: string;
  specifications: {
    partNumber: string;
    [key: string]: string;
  };
  created_at: Date;
  updated_at: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  specifications: {
    partNumber: { type: String, required: true },
    type: Map,
    of: String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
