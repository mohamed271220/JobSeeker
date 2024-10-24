import { NextFunction, Request, Response } from "express";

import { TagService } from "./tag.service";
import { userRequest } from "../../../../interfaces";
import { CustomError } from "../../../../utils/CustomError";

const tagService = new TagService();

export const createTag = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const tag = await tagService.createTag({ name });
    res.status(201).json({ message: "Added the tag successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const tag = await tagService.updateTag(req.params.tagId, { name });
    res.status(200).json({ message: "Updated the tag successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await tagService.deleteTag(req.params.tagId);
    res.status(200).json({ message: "Deleted the tag successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await tagService.getTags();
    res.status(200).json({ message: "Fetched tags successfully", tags });
  } catch (error) {
    next(error);
  }
};

export const getTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { includeBlogPosts } = req.query;
    const tag = await tagService.getTag(
      req.params.tagId,
      includeBlogPosts === "true"
    );
    if (!tag) {
      throw new CustomError("Tag not found", 404);
    }
    res.status(200).json({ message: "Fetched tag successfully", tag });
  } catch (error) {
    next(error);
  }
};
