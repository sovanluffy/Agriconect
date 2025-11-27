import { Request, Response } from "express";
import { createOrderService } from "@/service/orderService";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    // Call service to handle logic
    const orderData = await createOrderService(req);

    // Send response
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: orderData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};
