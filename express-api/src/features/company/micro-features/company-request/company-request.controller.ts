import { NextFunction, Response } from "express";
import { userRequest } from "../../../../interfaces";
import { CompanyRequestService } from "./company-request.service";
import { CustomError } from "../../../../utils/CustomError";

const companyRequestService = new CompanyRequestService();

export const getCompanyRequests = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.query ? parseInt(req.query.offset as string) : 0;
    const search = req.query.search ? (req.query.search as string) : "";
    const status = req.query.status ? (req.query.status as string) : "";

    const companyRequests = await companyRequestService.getCompanyRequests(
      limit,
      offset,
      search,
      status
    );
    res
      .status(200)
      .json({ message: "Fetched requests successfully", companyRequests });
  } catch (error) {
    next(error);
  }
};

export const getCompanyRequestById = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId } = req.params;
    const companyRequest = await companyRequestService.getCompanyRequestById(
      requestId
    );
    res
      .status(200)
      .json({ message: "Fetched the request successfully", companyRequest });
  } catch (error) {
    next(error);
  }
};

export const approveCompanyRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId } = req.params;
    const companyRequest = await companyRequestService.approveCompanyRequest(
      requestId
    );
    res
      .status(200)
      .json({ message: "Approved the request successfully", companyRequest });
  } catch (error) {
    next(error);
  }
};

export const rejectCompanyRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId } = req.params;
    const companyRequest = await companyRequestService.rejectCompanyRequest(
      requestId
    );
    res
      .status(200)
      .json({ message: "Rejected the request successfully", companyRequest });
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId } = req.params;
    const companyRequest = await companyRequestService.deleteCompanyRequest(
      requestId
    );
    res
      .status(200)
      .json({ message: "Deleted the request successfully", companyRequest });
  } catch (error) {
    next(error);
  }
};

export const applyForCompanyRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const companyRequest = await companyRequestService.applyForCompanyRequest(
      req.user.id,
      req.body
    );
    res.status(200).json({
      message: "Applied for the request successfully",
      companyRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCompanyRequests = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const companyRequests = await companyRequestService.getMyCompanyRequests(
      req.user.id,
      limit,
      offset
    );
    res.status(200).json({
      message: "Fetched your requests successfully",
      companyRequests,
    });
  } catch (error) {
    next(error);
  }
};
