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
  packageType: 'group' | 'private';
  scheduleStart: Date;
  scheduleEnd?: Date;
  availableDays: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  unavailableDates: Date[];
  maxCapacity: number;
  currentBookings: number;
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
  endLocation: { type: String, required: true },
  packageType: { type: String, enum: ['group', 'private'], required: true },
  scheduleStart: { type: Date, required: true },
  scheduleEnd: { type: Date },
  availableDays: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  unavailableDates: { type: [Date] },
  maxCapacity: { type: Number, required: true },
  currentBookings: { type: Number, default: 0 }
});

export default mongoose.model<ITourPackage>('TourPackage', TourPackageSchema);
