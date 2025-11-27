import mongoose, { Schema, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stock: number;
  category_id: mongoose.Schema.Types.ObjectId;
  status: "active" | "out of stock";
  farmer_id: mongoose.Schema.Types.ObjectId;
  image?: string; // new field for image URL or path
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: { type: String, enum: ["active", "out of stock"], default: "active" },
    farmer_id: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    image: { type: String, default: "" }, // optional image URL
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
