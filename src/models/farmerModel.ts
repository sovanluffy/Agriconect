import mongoose, { Schema, Document } from "mongoose";

export interface FarmerDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const farmerSchema = new Schema<FarmerDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
   
  },
  { timestamps: true }
);

export const FarmerModel = mongoose.model<FarmerDocument>(
  "Farmer",
  farmerSchema
);
