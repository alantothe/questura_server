import mongoose, { Document, Schema } from "mongoose";

const emailPattern = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// Define the interface for User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      match: emailPattern,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Create and export the model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
