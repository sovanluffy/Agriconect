import { Request } from "express";
import { CartItemModel } from "@/models/cartItemModel";
import { OrderModel } from "@/models/orderModel";
import { OrderItemModel } from "@/models/orderItemModel";
import { CartModel } from "@/models/CartModel";

export const createOrderService = async (req: Request) => {
  const userId = req.user?._id;
  if (!userId) throw new Error("Unauthorized");

  const { cart_id } = req.body;
  if (!cart_id) throw new Error("cart_id is required");

  // Find all cart items
  const cartItems = await CartItemModel.find({ cart_id }).populate("product_id");
  if (!cartItems || cartItems.length === 0) throw new Error("No cart items found");

  let total = 0;

  // Create Order
  const order = await OrderModel.create({
    user_id: userId,
    total: 0, // temporarily 0, will update after items
    status: "completed",
    date: new Date(),
  });

  //  Create OrderItems
  for (const item of cartItems) {
    const product = item.product_id as any;
    const price = product.price;
    const quantity = item.quantity;
    total += price * quantity;

    await OrderItemModel.create({
      order_id: order._id,
      product_id: product._id,
      quantity,
      price,
    });
  }

  // Update order total
  order.total = total;
  await order.save();

  // Clear cart
  await CartItemModel.deleteMany({ cart_id });
  await CartModel.deleteMany({ cart_id });


  return {
    message: "Order completed and cart cleared",
    data: order,
  };
};
