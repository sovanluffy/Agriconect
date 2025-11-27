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
 *     summary: Checkout and create a new order
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
 *               - username
 *               - address
 *               - phone
 *             properties:
 *               username:
 *                 type: string
 *                 example: "John Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Phnom Penh"
 *               phone:
 *                 type: string
 *                 example: "+855123456789"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     total:
 *                       type: number
 *                     status:
 *                       type: string
 *                     date:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                           quantity:
 *                             type: number
 *                           price:
 *                             type: number
 *       400:
 *         description: Missing fields or cart not found
 *       500:
 *         description: Server error
 */
router.post("/orders", authMiddleware, createOrderController);

export default router;
