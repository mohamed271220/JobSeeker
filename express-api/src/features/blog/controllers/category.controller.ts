import { NextFunction, Request, Response } from "express";

import { CategoryService } from "../services/category.service";
import { userRequest } from "../../../interfaces";
import { CustomError } from "../../../utils/CustomError";

const categoryService = new CategoryService();

export const createCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory({ name });
    res
      .status(201)
      .json({ message: "Added the category successfully", category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = await categoryService.updateCategory(
      req.params.categoryId,
      { name }
    );
    res
      .status(200)
      .json({ message: "Updated the category successfully", category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await categoryService.deleteCategory(req.params.categoryId);
    res.status(200).json({ message: "Deleted the category successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getCategories();
    res
      .status(200)
      .json({ message: "Fetched categories successfully", categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { includeBlogPosts } = req.query;
    const category = await categoryService.getCategory(
      req.params.categoryId,
      includeBlogPosts === "true"
    );
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    res
      .status(200)
      .json({ message: "Fetched category successfully", category });
  } catch (error) {
    next(error);
  }
};
