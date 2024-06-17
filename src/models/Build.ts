// src/models/Build.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBuild extends Document {
  userId: string;
  components: { type: string; productId: mongoose.Types.ObjectId }[];
}

const BuildSchema: Schema = new Schema({
  userId: { type: String, required: true },
  components: [{ type: { type: String, required: true }, productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true } }],
});

export default mongoose.models.Build || mongoose.model<IBuild>('Build', BuildSchema);
