import { Request } from "express";
import { CartItemModel } from "@/models/cartItemModel";
import { OrderModel } from "@/models/orderModel";
import { OrderItemModel } from "@/models/orderItemModel";
import { CartModel } from "@/models/CartModel";

// Service handles all the business logic
export const createOrderService = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw new Error("Unauthorized: User not found");

  const { username, address, phone } = req.body;
  if (!username || !address || !phone) throw new Error("Username, address, and phone are required");

  // Find the cart for this user
  const cart = await CartModel.findOne({ user_id: userId });
  if (!cart) throw new Error("Cart not found for this user");

  const cartItems = await CartItemModel.find({ cart_id: cart._id }).populate("product_id");
  if (!cartItems || cartItems.length === 0) throw new Error("No cart items found");

  // Create order
  let total = 0;
  const order = new OrderModel({
    user_id: userId,
    total: 0, // temporary
    status: "completed",
    date: new Date(),
    username,
    address,
    phone,
  });
  await order.save();

  // Create order items
  const orderItems: any[] = [];
  for (const item of cartItems) {
    const product = item.product_id as any;
    const price = product.price;
    const quantity = item.quantity;
    total += price * quantity;

    const orderItem = new OrderItemModel({
      order_id: order._id,
      product_id: product._id,
      quantity,
      price,
    });
    await orderItem.save();

    orderItems.push({
      product_id: product._id,
      quantity,
      price,
    });
  }

  // Update order total
  order.total = total;
  await order.save();

  // Clear user's cart
  await CartItemModel.deleteMany({ cart_id: cart._id });
  await CartModel.findByIdAndDelete(cart._id);

  return {
    order_id: order._id,
    username: order.username,
    address: order.address,
    phone: order.phone,
    total: order.total,
    status: order.status,
    date: order.date,
    items: orderItems,
  };
};
