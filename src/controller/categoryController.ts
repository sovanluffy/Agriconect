import { Request , Response } from "express";
import { createCategoryService } from "../service/categoryService";

export const createCategoryServiceController = async (req: Request, res: Response) => {
  return  await createCategoryService(req, res);
    
}