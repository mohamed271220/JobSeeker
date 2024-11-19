import { NextFunction, Response } from "express";
import { userRequest } from "../../../interfaces";
import { JobApplicationService } from "../services/job-application.service";
import { CustomError } from "../../../utils/CustomError";

const jobApplicationService = new JobApplicationService();

export const applyToAJob = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const userId = req.user.id;
    const { jobId } = req.params;
    // questionAnswers is an object that contains the question id and the answer
    const { questionAnswers } = req.body;
    const application = await jobApplicationService.applyToAJob(
      userId,
      jobId,
      questionAnswers
    );
    res.status(201).json({
      message: "Applied to job successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const userId = req.user.id;
    const { jobId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const applications = await jobApplicationService.getAllApplications(
      userId,
      jobId,
      limit,
      offset
    );
    res.status(200).json({
      message: "All applications retrieved successfully",
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const userId = req.user.id;
    const { applicationId } = req.params;
    const application = await jobApplicationService.getApplication(
      userId,
      applicationId
    );
    res.status(200).json({
      message: "Application retrieved successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplicationsCurrentUser = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const userId = req.user.id;
    const applications =
      await jobApplicationService.getAllApplicationsCurrentUser(userId);
    res.status(200).json({
      message: "All applications retrieved successfully",
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplicationsCurrentUserInCompany = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const userId = req.user.id;
    const { companyId } = req.params;
    const applications =
      await jobApplicationService.getAllApplicationsCurrentUserInCompany(
        userId,
        companyId
      );
    res.status(200).json({
      message: "All applications retrieved successfully",
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectApplication = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const feedback = req.body.feedback;
    const { applicationId } = req.params;
    const userId = req.user.id;
    await jobApplicationService.rejectApplication(
      userId,
      applicationId,
      feedback
    );
    res.status(200).json({
      message: "Application rejected successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const acceptApplication = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("Unauthorized", 401);
    }
    const { applicationId } = req.params;
    const userId = req.user.id;
    await jobApplicationService.acceptApplication(userId, applicationId);
    res.status(200).json({
      message: "Application accepted successfully",
    });
  } catch (error) {
    next(error);
  }
};
