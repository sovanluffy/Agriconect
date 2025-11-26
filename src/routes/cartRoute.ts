import { Router } from "express";
import {
  addMultipleItemsController,
  getCartController
} from "@/controller/cartItemController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart related endpoints
 */

/**
 * @swagger
 * /api/cart/add-multiple-items:
 *   post:
 *     summary: Add multiple items to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       example: "64a7f0c2e1b2c3d4e5f67890"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Items added to cart successfully
 *       400:
 *         description: Bad request
 */
router.post("/cart/add-multiple-items",authMiddleware, addMultipleItemsController);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all items in the user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: List of cart items
 *       400:
 *         description: Bad request
 */
router.get("/cart", getCartController);

export default router;