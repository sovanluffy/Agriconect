import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "@/service/productService";

// ===============================
// Create Product
// ===============================
export const createProductController = (req: Request, res: Response) => {
  return createProductService(req, res);
};

// ===============================
// Get All Products
// ===============================
export const getAllProductsController = (req: Request, res: Response) => {
  return getAllProductsService(req, res);
};

// ===============================
// Get Product by ID
// ===============================
export const getProductByIdController = (req: Request, res: Response) => {
  return getProductByIdService(req, res);
};

// ===============================
// Update Product
// ===============================
export const updateProductController = (req: Request, res: Response) => {
  return updateProductService(req, res);
};

// ===============================
// Delete Product
// ===============================
export const deleteProductController = (req: Request, res: Response) => {
  return deleteProductService(req, res);
};
