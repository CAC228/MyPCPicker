// src/models/Favorite.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: string;
  productId: mongoose.Types.ObjectId;
}

const FavoriteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

export default mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);
