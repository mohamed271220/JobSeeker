import { NextFunction, Request, Response } from "express";
import { userRequest } from "../../interfaces";
import { IndustryService } from "./industry.service";

const industryService = new IndustryService();

export const createIndustry = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const industry = await industryService.createIndustry({ name });
    res
      .status(201)
      .json({ message: "Added the industry successfully", industry });
  } catch (error) {
    next(error);
  }
};

export const updateIndustry = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const industry = await industryService.updateIndustry(
      req.params.industryId,
      { name }
    );
    res
      .status(200)
      .json({ message: "Updated the industry successfully", industry });
  } catch (error) {
    next(error);
  }
};

export const deleteIndustry = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await industryService.deleteIndustry(req.params.industryId);
    res.status(200).json({ message: "Deleted the industry successfully" });
  } catch (error) {
    next(error);
  }
};

export const getIndustries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const industries = await industryService.getIndustries();
    res
      .status(200)
      .json({ message: "Fetched industries successfully", industries });
  } catch (error) {
    next(error);
  }
};

export const getIndustry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const industry = await industryService.getIndustry(req.params.industryId);
    res
      .status(200)
      .json({ message: "Fetched the industry successfully", industry });
  } catch (error) {
    next(error);
  }
};
