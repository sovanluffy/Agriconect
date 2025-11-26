// controllers/cartController.ts
import { Request, Response } from "express";
import * as cartService from "@/service/cartService";

export const addMultipleItemsController = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?._id;
    const { products } = req.body;

    if (!user_id) throw new Error("User not found in token");
    if (!products || !Array.isArray(products)) throw new Error("Products array is required");

    const cartItems = await cartService.addMultipleItemsToCart(user_id, products);
    res.status(201).json(cartItems);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?._id;
    if (!user_id) throw new Error("User not found in token");

    const items = await cartService.getCartItems(user_id);
    res.status(200).json(items);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
