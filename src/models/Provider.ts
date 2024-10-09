import mongoose, { Schema, Document } from 'mongoose';

interface IProvider extends Document {
  companyName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  paypalEmail: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
}

const ProviderSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  paypalEmail: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);