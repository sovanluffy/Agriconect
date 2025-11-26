import { Request, Response } from "express";
import { createOrderService } from "@/service/orderService";

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const result = await createOrderService(req);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
