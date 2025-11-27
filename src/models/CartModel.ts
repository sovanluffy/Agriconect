// models/CartModel.ts
import { Schema, model } from "mongoose";

interface ICart {
  user_id: Schema.Types.ObjectId;
  cart_total: number;   
  created_at: Date;
}

const CartSchema = new Schema<ICart>({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  cart_total: { type: Number, default: 0 },   
  created_at: { type: Date, default: Date.now },
});

export const CartModel = model<ICart>("Cart", CartSchema);
