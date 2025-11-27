import { Request, Response } from "express";
import {
  createFarmer,
  getFarmerById,
  getAllFarmers,
  updateFarmer,
  deleteFarmer,
} from "@/service/farmerService";

// Create Farmer
export const createFarmerController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const data = req.body;
    const farmer = await createFarmer(userId, data);
    res.status(201).json({ success: true, message: "Farmer profile created successfully", data: farmer });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get single Farmer
export const getFarmerController = async (req: Request, res: Response) => {
  try {
    const { farmerId } = req.params;
    const farmer = await getFarmerById(farmerId);
    res.status(200).json({ success: true, message: "Farmer retrieved successfully", data: farmer });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// Get all Farmers
export const getAllFarmersController = async (_req: Request, res: Response) => {
  try {
    const farmers = await getAllFarmers();
    res.status(200).json({ success: true, message: "All farmers retrieved successfully", data: farmers });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Farmer
export const updateFarmerController = async (req: Request, res: Response) => {
  try {
    const { farmerId } = req.params;
    const data = req.body;
    const farmer = await updateFarmer(farmerId, data);
    res.status(200).json({ success: true, message: "Farmer updated successfully", data: farmer });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// Delete Farmer
export const deleteFarmerController = async (req: Request, res: Response) => {
  try {
    const { farmerId } = req.params;
    const message = await deleteFarmer(farmerId);
    res.status(200).json({ success: true, message });
  } catch (err: any) {
    res.status(404).json({ success: false, message: err.message });
  }
};
