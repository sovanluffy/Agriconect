import mongoose, { Schema, Document, Types } from "mongoose";

export interface Order extends Document {
  user_id: Types.ObjectId;
  date: Date;
  status: "pending" | "completed" | "cancelled";
  total: number;
  username: string;
  address: string;
  phone: string;
}

const orderSchema = new Schema<Order>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
    total: { type: Number, required: true },
    username: { type: String, required: true },
address: { type: String, required: true },
phone: { type: String, required: true },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", orderSchema);
