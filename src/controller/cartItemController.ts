// controllers/cartController.ts
import { Request, Response } from "express";
import * as cartService from "@/service/cartService";

export const addItemController = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?._id;
    const { product_id, quantity } = req.body;

    if (!user_id) throw new Error("User not found in token");
    if (!product_id || !quantity) throw new Error("Product ID and quantity are required");

    const result = await cartService.addItemToCart(user_id, product_id, quantity);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart_total: result.cart_total,
      cart_item: result.cart_item,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
