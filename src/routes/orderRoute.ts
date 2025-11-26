import { Router } from "express";
import { createOrderController } from "@/controller/orderController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *             properties:
 *               cart_id:
 *                 type: string
 *                 example: "64a7f0c2e1b2c3d4e5f67890"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Missing fields or cart not found
 *       500:
 *         description: Server error
 */
router.post("/orders", authMiddleware, createOrderController);

export default router;