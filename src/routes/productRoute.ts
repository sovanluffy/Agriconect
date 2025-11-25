// routes/productRoute.ts
import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "@/controller/productController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - category_name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Red Tomato"
 *               price:
 *                 type: number
 *                 example: 2.5
 *               stock:
 *                 type: number
 *                 example: 50
 *               category_name:
 *                 type: string
 *                 example: "Vegetables"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Missing fields or category/farmer not found
 *       500:
 *         description: Server error
 */
router.post("/products", authMiddleware, checkRoleMiddleware("Farmer"), createProductController);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products for the logged-in farmer
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product list
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/products", authMiddleware, getAllProductsController);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: "6770105ba3cde5512c88e444"
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/products/:id", authMiddleware, getProductByIdController);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Organic Tomato"
 *               price:
 *                 type: number
 *                 example: 3.0
 *               stock:
 *                 type: number
 *                 example: 40
 *               category_name:
 *                 type: string
 *                 example: "Fresh Vegetables"
 *               status:
 *                 type: string
 *                 enum: [active, out of stock]
 *                 example: active
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found or not yours
 *       500:
 *         description: Server error
 */
router.put("/products/:id", authMiddleware, checkRoleMiddleware("Farmer"), updateProductController);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found or not yours
 *       500:
 *         description: Server error
 */
router.delete("/products/:id", authMiddleware, checkRoleMiddleware("Farmer"), deleteProductController);

export default router;
