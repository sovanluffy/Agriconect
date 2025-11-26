import mongoose, { Schema, Document, Types } from "mongoose";

export interface OrderItem extends Document {
  order_id: Types.ObjectId;
  product_id: Types.ObjectId;
  quantity: number;
  price: number;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderItemModel = mongoose.model<OrderItem>("OrderItem", orderItemSchema);
