import { Router } from "express";
import {
  assignFarmerRoleController,
  getRolesController,
  createRoleController,
  deleteRoleController,
} from "@/controller/roleController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role operations
 */

/**
 * @swagger
 * /api/admin/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 example: Role description
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Role already exists
 */
router.post("/roles", authMiddleware, checkRoleMiddleware("Admin"), createRoleController);

/**
 * @swagger
 * /api/admin/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 */
router.get("/roles", authMiddleware, checkRoleMiddleware("Admin"), getRolesController);

/**
 * @swagger
 * /api/admin/roles/{roleId}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: string
 *         required: true
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Role not found
 */
router.delete("/roles/:roleId", authMiddleware, checkRoleMiddleware("Admin"), deleteRoleController);

/**
 * @swagger
 * /api/admin/assign-farmer:
 *   post:
 *     summary: Admin assigns Farmer role to any user
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 691e66883168fcdc64da994e
 *     responses:
 *       200:
 *         description: Farmer role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/assign-farmer", authMiddleware, checkRoleMiddleware("Admin"), assignFarmerRoleController);

export default router;
