import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: string; // Clerk userId
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema = new Schema({
  userId: { type: String, required: true }, // Clerk userId
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);
export default Favorite;
