// src/models/Store.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStore extends Document {
  name: string;
  url: string;
}

const StoreSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);
export default Store;
