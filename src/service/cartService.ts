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

export const addItemToCart = async (user_id: string, product_id: string, quantity: number) => {
  const cart = await getOrCreateCart(user_id);

  const product = await ProductModel.findById(product_id);
  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Not enough stock");

  // check existing cart item
  let cartItem = await CartItemModel.findOne({
    cart_id: cart._id,
    product_id,
  });

  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.total_price = cartItem.quantity * product.price;   // ⭐ update total price
    cartItem.added_at = new Date();
    await cartItem.save();
  } else {
    cartItem = new CartItemModel({
      cart_id: cart._id,
      product_id,
      quantity,
      total_price: product.price * quantity,   // ⭐ new item total price
    });
    await cartItem.save();
  }

  // deduct stock
  product.stock -= quantity;
  await product.save();

  // ⭐ calculate cart_total
  const items = await CartItemModel.find({ cart_id: cart._id });
  let cart_total = 0;

  items.forEach((i) => {
    cart_total += i.total_price;
  });

  // ⭐ update cart_total in DB
  cart.cart_total = cart_total;
  await cart.save();

  return {
    message: "Item added to cart",
    cart_item: cartItem,
    cart_total: cart_total,
  };
};


export const getCartItems = async (user_id: string) => {
  const cart = await getOrCreateCart(user_id);
  return await CartItemModel.find({ cart_id: cart._id }).populate("product_id");
};
