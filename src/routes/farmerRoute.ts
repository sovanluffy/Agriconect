import { Router } from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import {
  createFarmerController,
  getFarmerController,
  getAllFarmersController,
  updateFarmerController,
  deleteFarmerController,
} from "@/controller/farmerControler";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Farmer
 *   description: Farmer related endpoints
 */

/**
 * @swagger
 * /api/farmers:
 *   post:
 *     summary: Create a new farmer profile
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: ObjectId
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Farmer created successfully
 *       400:
 *         description: Bad request / Farmer already exists
 */
router.post("/", authMiddleware, checkRoleMiddleware("Admin"), createFarmerController);

/**
 * @swagger
 * /api/farmers:
 *   get:
 *     summary: Get all farmers with user details
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of farmers
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, checkRoleMiddleware("Admin"), getAllFarmersController);

/**
 * @swagger
 * /api/farmers/{farmerId}:
 *   get:
 *     summary: Get a single farmer by ID with user details
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Farmer ID
 *     responses:
 *       200:
 *         description: Farmer retrieved successfully
 *       404:
 *         description: Farmer not found
 */
router.get("/:farmerId", authMiddleware, checkRoleMiddleware("Admin"), getFarmerController);

/**
 * @swagger
 * /api/farmers/{farmerId}:
 *   put:
 *     summary: Update a farmer profile
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Farmer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Farmer updated successfully
 *       404:
 *         description: Farmer not found
 */
router.put("/:farmerId", authMiddleware, checkRoleMiddleware("Admin"), updateFarmerController);

/**
 * @swagger
 * /api/farmers/{farmerId}:
 *   delete:
 *     summary: Delete a farmer profile
 *     tags: [Farmer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Farmer ID
 *     responses:
 *       200:
 *         description: Farmer deleted successfully
 *       404:
 *         description: Farmer not found
 */
router.delete("/:farmerId", authMiddleware, checkRoleMiddleware("Admin"), deleteFarmerController);

export default router;
