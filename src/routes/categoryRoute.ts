import { Router } from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import { createCategoryServiceController , deleteCategoryServiceController , getAllCategoriesServiceController } from "../controller/categoryController";

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


/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     description: Deletes a category by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Category deleted successfully"
 *               deletedCategory:
 *                 _id: "6748dfaf8da1df9ac982b3a7"
 *                 name: "Vegetables"
 *                 description: "Fresh vegetable products"
 *       400:
 *         description: Invalid category ID or request
 *         content:
 *           application/json:
 *             example:
 *               message: "Category ID is required"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Category not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
categoryRoute.delete(
  "/:id",
  authMiddleware,
  checkRoleMiddleware("Admin"),
  deleteCategoryServiceController
);

/**
 * @swagger
 * /api/category/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     description: Returns a list of all categories in the system
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Categories fetched successfully"
 *               data:
 *                 - _id: "6748dfaf8da1df9ac982b3a7"
 *                   name: "Vegetables"
 *                   description: "Fresh vegetable products"
 *                 - _id: "6748dfaf8da1df9ac982b3a8"
 *                   name: "Fruits"
 *                   description: "Fresh fruits"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
categoryRoute.get(
  "/categories",
  authMiddleware,
  getAllCategoriesServiceController
);
export default categoryRoute;
