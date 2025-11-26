// models/CartModel.ts
import { Schema, model } from "mongoose";

interface ICart {
  user_id: Schema.Types.ObjectId;
  created_at: Date;
}

const CartSchema = new Schema<ICart>({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  created_at: { type: Date, default: Date.now },
});

export const CartModel = model<ICart>("Cart", CartSchema);
