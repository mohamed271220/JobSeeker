import { NextFunction, Request, Response } from "express";
import { userRequest } from "../../interfaces";
import { UserProfileService } from "./user-profile.service";
import { CustomError } from "../../common/error-handlers/CustomError";

const userProfileService = new UserProfileService();

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userDetails = await userProfileService.getUserDetails(userId);
    res.status(200).json({
      message: "User details retrieved successfully",
      userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userProfile = await userProfileService.getUserProfile(userId);
    res.status(200).json({
      message: "User profile retrieved successfully",
      userProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserContactDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const contactDetails = await userProfileService.getUserContactDetails(
      userId
    );
    res.status(200).json({
      message: "User contact details retrieved successfully",
      contactDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const experiences = await userProfileService.getUserExperiences(userId);
    res.status(200).json({
      message: "User experiences retrieved successfully",
      experiences,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserEducations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const educations = await userProfileService.getUserEducations(userId);
    res.status(200).json({
      message: "User educations retrieved successfully",
      educations,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const projects = await userProfileService.getUserProjects(userId);
    res.status(200).json({
      message: "User projects retrieved successfully",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const skills = await userProfileService.getUserSkills(userId);
    res.status(200).json({
      message: "User skills retrieved successfully",
      skills,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const testimonials = await userProfileService.getUserTestimonials(userId);
    res.status(200).json({
      message: "User testimonials retrieved successfully",
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserDetails = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { first_name, last_name, bio, profile_picture, resume, title } =
      req.body;
    await userProfileService.updateUserDetails(id, {
      first_name,
      last_name,
      bio,
      profile_picture,
      resume,
      title,
    });
    res.status(200).json({
      message: "User details updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addContactDetails = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { phone_number, address, linkedin_url, github_url, website_url } =
      req.body;
    await userProfileService.addContactDetails(id, {
      phone_number,
      address,
      linkedin_url,
      github_url,
      website_url,
    });
    res.status(201).json({
      message: "Contact details added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addExperience = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { title, company, location, start_date, end_date, description } =
      req.body;
    await userProfileService.addExperience(id, {
      title,
      company,
      location,
      start_date,
      end_date,
      description,
    });
    res.status(201).json({
      message: "Experience added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addEducation = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { institution, degree, startDate, endDate } = req.body;
    await userProfileService.addEducation(id, {
      institution,
      degree,
      startDate,
      endDate,
    });
    res.status(201).json({
      message: "Education added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addProject = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { title, description, startDate, endDate, link } = req.body;
    await userProfileService.addProject(id, {
      title,
      description,
      startDate,
      endDate,
      link,
    });
    res.status(201).json({
      message: "Project added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addSkills = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { skills } = req.body;
    await userProfileService.addSkills(id, skills);
    res.status(201).json({
      message: "Skills added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addTestimonial = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new CustomError("User not found", 404);
    }
    const { id } = req.user;
    const { content, author, receivedBy } = req.body;
    await userProfileService.addTestimonial(id, {
      content,
      author,
      receivedBy,
    });
    res.status(201).json({
      message: "Testimonial added successfully",
    });
  } catch (error) {
    next(error);
  }
};
