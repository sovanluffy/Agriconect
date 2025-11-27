import { Request, Response } from "express";
import {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  assignFarmerRoleToUser,
} from "@/service/roleService";

// Create Role
export const createRoleController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const result = await createRole(name, description);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Roles
export const getRolesController = async (_req: Request, res: Response) => {
  try {
    const roles = await getRoles();
    res.status(200).json({ success: true, data: roles });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Role
export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    const data = req.body;
    const updatedRole = await updateRole(roleId, data);
    res.status(200).json({ success: true, data: updatedRole });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Delete Role
export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    const message = await deleteRole(roleId);
    res.status(200).json({ success: true, message });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Assign Farmer Role to User
export const assignFarmerRoleController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // Must be sent in request body
    const message = await assignFarmerRoleToUser(userId);
    res.status(200).json({ success: true, message });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};
