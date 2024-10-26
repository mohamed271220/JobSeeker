import { NextFunction, Request, Response } from "express";
import { userRequest } from "../../interfaces";
import { CustomError } from "../../utils/CustomError";
import { CompanyService } from "./company.service";

const companyService = new CompanyService();

export const deleteCompany = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const { companyId } = req.params;
    const userId = req.user.id;
    const company = await companyService.deleteCompany(companyId, userId);
    res
      .status(200)
      .json({ message: "Deleted the company successfully", company });
  } catch (error) {
    next(error);
  }
};

export const reopenCompany = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const { companyId } = req.params;
    const userId = req.user.id;
    const company = await companyService.reopenCompany(companyId, userId);
    res
      .status(200)
      .json({ message: "Reopened the company successfully", company });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const { companyId } = req.params;
    const userId = req.user.id;
    const company = await companyService.updateCompany(
      companyId,
      userId,
      req.body
    );
    res
      .status(200)
      .json({ message: "Updated the company successfully", company });
  } catch (error) {
    next(error);
  }
};

export const addRepresentative = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const { companyId } = req.params;
    const userId = req.user.id;
    const { representativeId } = req.body;
    const representative = await companyService.addRepresentative(
      companyId,
      userId,
      representativeId
    );
    res.status(201).json({
      message: "Added the representative successfully",
      representative,
    });
  } catch (error) {
    next(error);
  }
};

export const removeRepresentative = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const { companyId, representativeId } = req.params;
    const userId = req.user.id;
    await companyService.removeRepresentative(
      companyId,
      userId,
      representativeId
    );
    res
      .status(200)
      .json({ message: "Removed the representative successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const companies = await companyService.getCompanies(limit, offset);
    res
      .status(200)
      .json({ message: "Fetched companies successfully", companies });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;
    const company = await companyService.getCompany(companyId);
    res
      .status(200)
      .json({ message: "Fetched the company successfully", company });
  } catch (error) {
    next(error);
  }
};

export const getCompaniesByUser = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const companies = await companyService.getCompaniesByUser(userId);
    res
      .status(200)
      .json({ message: "Fetched companies successfully", companies });
  } catch (error) {
    next(error);
  }
};

export const getCompaniesByRepresentative = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const companies = await companyService.getCompaniesByRepresentative(userId);
    res
      .status(200)
      .json({ message: "Fetched companies successfully", companies });
  } catch (error) {
    next(error);
  }
};

export const getCompaniesByIndustry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { industryId } = req.params;
    const companies = await companyService.getCompaniesByIndustry(industryId);
    res
      .status(200)
      .json({ message: "Fetched companies successfully", companies });
  } catch (error) {
    next(error);
  }
};
