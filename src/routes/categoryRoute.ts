import { Router } from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import { createCategoryServiceController } from "../controller/categoryController";

const categoryRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category related endpoints
 */

/**
 * @swagger
 * /api/category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []    # JWT required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fruits
 *               description:
 *                 type: string
 *                 example: All types of fruits
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient role
 *       500:
 *         description: Server error
 */
categoryRoute.post(
  "/create-category",
  authMiddleware,
  checkRoleMiddleware("Admin"),
  createCategoryServiceController
);

export default categoryRoute;
