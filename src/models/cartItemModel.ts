// models/CartItemModel.ts
import mongoose, { Schema, model } from "mongoose";

interface ICartItem {
  cart_id: mongoose.Schema.Types.ObjectId;
  product_id: mongoose.Schema.Types.ObjectId;
  quantity: number;
  total_price: number;   
  added_at: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  cart_id: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },  
  added_at: { type: Date, default: Date.now },
});

export const CartItemModel = model<ICartItem>("CartItem", CartItemSchema);
