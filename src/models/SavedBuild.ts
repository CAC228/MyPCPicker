// src/models/SavedBuild.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedBuild extends Document {
  userId: string; // Clerk userId
  build: { componentType: string, productId: mongoose.Types.ObjectId }[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

const SavedBuildSchema: Schema = new Schema({
  userId: { type: String, required: true }, // Clerk userId
  build: [
    {
      componentType: { type: String, required: true },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false },
});

const SavedBuild = mongoose.models.SavedBuild || mongoose.model<ISavedBuild>('SavedBuild', SavedBuildSchema);
export default SavedBuild;
