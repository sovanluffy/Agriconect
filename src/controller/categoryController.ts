import { Request , Response } from "express";
import { createCategoryService , deleteCategoryService , getAllCategoriesService } from "../service/categoryService";

export const createCategoryServiceController = async (req: Request, res: Response) => {
  return  await createCategoryService(req, res);
    
}

export const deleteCategoryServiceController = async (req: Request, res: Response) => {
  return  await deleteCategoryService(req, res);
}

//Get all categories
export const getAllCategoriesServiceController = async (req: Request, res: Response) => {
  return  await getAllCategoriesService(req, res);
}


