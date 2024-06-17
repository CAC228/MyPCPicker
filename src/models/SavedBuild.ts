import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBuildComponent {
  componentType: string;
  productId: string;
}

export interface ISavedBuild extends Document {
  userId: string;
  build: IBuildComponent[];
  isPublic: boolean;
}

const savedBuildSchema: Schema<ISavedBuild> = new Schema({
  userId: { type: String, required: true },
  build: [
    {
      componentType: { type: String, required: true },
      productId: { type: String, required: true },
    },
  ],
  isPublic: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const SavedBuild: Model<ISavedBuild> = mongoose.models.SavedBuild || mongoose.model('SavedBuild', savedBuildSchema);
export default SavedBuild;
