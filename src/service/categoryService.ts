import { Request, Response } from "express";
import { categoryModel } from "@/models/categoryModel";
import { handleError } from "@/utils/response-util";

// Service to create a new category
export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name) {
      return handleError(res, 400, "Category name is required");
    }

    if (!description) {
      return handleError(res, 400, "Category description is required");
    }

    // Check if category already exists
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return handleError(res, 400, "Category already exists");
    }

    // Create new category
    const newCategory = await categoryModel.create({
      name,
      description,
    });

    // Return response
    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });

  } catch (error) {
    return handleError(res, 500, "Internal server error");
  }
};

//Service to delete category
   export const deleteCategoryService = async (req: Request , res: Response ) => {

    try{
         const { id } = req.params;
         


    // Check if category exists
    const category = await categoryModel.findById(id);
    if (!category) {
      return handleError(res, 404, "Category not found");
    }

    // Delete category
    await categoryModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory: category,
    });

    }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
   }
// Get all categories
export const getAllCategoriesService = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    return handleError(res, 500, "Internal server error");
  }
};


