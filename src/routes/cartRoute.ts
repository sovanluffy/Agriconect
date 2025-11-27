import { Router } from "express";
import { addItemController } from "@/controller/cartItemController";
import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart related endpoints
 */

/**
 * @swagger
 * /api/cart/add-item:
 *   post:
 *     summary: Add a single item to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "64a7f0c2e1b2c3d4e5f67890"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       400:
 *         description: Bad request
 */
router.post("/cart/add-item", authMiddleware, addItemController);



export default router;
