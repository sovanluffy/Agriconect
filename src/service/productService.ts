import { Request, Response } from "express";
import { ProductModel } from "@/models/productModel";
import { FarmerModel } from "@/models/farmerModel";
import { categoryModel } from "@/models/categoryModel";

// ===============================
// Create Product
// ===============================
export const createProductService = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category_name, image } = req.body;

    // Get user ID from token
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Find Farmer by user ID
    const farmer = await FarmerModel.findOne({ user_id: userId });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    // Find Category by name
    const category = await categoryModel.findOne({ name: category_name });
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Create product
    const product = await ProductModel.create({
      name,
      price,
      stock,
      category_id: category._id,
      farmer_id: farmer._id,
      image: image || "", // take image from body
    });

    return res.status(201).json({ message: "Product created successfully", data: product });
  } catch (err: any) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===============================
// Update Product
// ===============================
export const updateProductService = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const farmer = await FarmerModel.findOne({ user_id: userId });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const { name, price, stock, category_name, image } = req.body;
    const updateData: any = { name, price, stock };

    if (category_name) {
      const category = await categoryModel.findOne({ name: category_name });
      if (!category) return res.status(404).json({ message: "Category not found" });
      updateData.category_id = category._id;
    }

    // Update image from body
    if (image) updateData.image = image;

    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.id, farmer_id: farmer._id },
      updateData,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found or not yours" });

    return res.status(200).json({ message: "Product updated successfully", data: product });
  } catch (err: any) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===============================
// Delete Product
// ===============================
export const deleteProductService = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const farmer = await FarmerModel.findOne({ user_id: userId });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const product = await ProductModel.findOneAndDelete({ _id: req.params.id, farmer_id: farmer._id });
    if (!product) return res.status(404).json({ message: "Product not found or not yours" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


//Get All Products - Public Service
export const getAllProductsPublicService = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("category_id").populate("farmer_id");
    return res.status(200).json({ message: "Products retrieved successfully", data: products });
  } catch (err: any) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};