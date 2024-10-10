import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  email: string;
  packageId: string;
  amount: number;
  currency: string;
  status: string;
  paypalOrderId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    email: { type: String, required: true },
    packageId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    status: { type: String, required: true, default: 'CREATED' },
    paypalOrderId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

export default mongoose.model<IOrder>('Order', OrderSchema);