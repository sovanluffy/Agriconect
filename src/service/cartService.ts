// services/cartService.ts
import { CartModel } from "../models/CartModel";
import { CartItemModel } from "@/models/cartItemModel";
import { ProductModel } from "@/models/productModel";

export const getOrCreateCart = async (user_id: string) => {
  let cart = await CartModel.findOne({ user_id });
  if (!cart) {
    cart = new CartModel({ user_id });
    await cart.save();
  }
  return cart;
};

export const addMultipleItemsToCart = async (user_id: string, products: { product_id: string; quantity: number }[]) => {
  const cart = await getOrCreateCart(user_id);
  const addedItems = [];

  for (const item of products) {
    const product = await ProductModel.findById(item.product_id);
    if (!product) throw new Error(`Product not found: ${item.product_id}`);
    if (product.stock < item.quantity) throw new Error(`Not enough stock: ${product.name}`);

    // Check if product already exists in cart
    let cartItem = await CartItemModel.findOne({ cart_id: cart._id, product_id: item.product_id });
    if (cartItem) {
      cartItem.quantity += item.quantity;
      cartItem.added_at = new Date();
      await cartItem.save();
    } else {
      cartItem = new CartItemModel({ cart_id: cart._id, product_id: item.product_id, quantity: item.quantity });
      await cartItem.save();
    }

    // Update product stock
    product.stock -= item.quantity;
    if (product.stock === 0) product.status = "out of stock";
    await product.save();

    addedItems.push(cartItem);
  }

  return addedItems;
};

export const getCartItems = async (user_id: string) => {
  const cart = await getOrCreateCart(user_id);
  return await CartItemModel.find({ cart_id: cart._id }).populate("product_id");
};
