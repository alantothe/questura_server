import mongoose, { Schema, Document } from 'mongoose';

interface ITourPackage extends Document {
  title: string;
  country: string;
  city: string;
  images: string[];
  priceInCents: number;
  about: string;
  whatToExpect: string[];
  duration: string;
  startTime: string;
  highlights: string[];
  additionalInformation: string[];
  provider: string;
  startLocation: string;
  address: string;
  endLocation: string;
}

const TourPackageSchema: Schema = new Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  images: { type: [String], required: true },
  priceInCents: { type: Number, required: true },
  about: { type: String, required: true },
  whatToExpect: { type: [String], required: true },
  duration: { type: String, required: true },
  startTime: { type: String, required: true },
  highlights: { type: [String], required: true },
  additionalInformation: { type: [String], required: true },
  provider: { type: String, required: true },
  startLocation: { type: String, required: true },
  address: { type: String, required: true },
  endLocation: { type: String, required: true }
});

export default mongoose.model<ITourPackage>('TourPackage', TourPackageSchema);
