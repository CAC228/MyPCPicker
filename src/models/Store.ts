// src/models/Store.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
  name: string;
  url: string;
}

const StoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
