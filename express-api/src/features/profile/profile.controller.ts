import { NextFunction, Request, Response } from "express";
import { userRequest } from "../../interfaces";
import { ProfileService } from "./profile.service";
import { CustomError } from "../../utils/CustomError";

const profileService = new ProfileService();

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userDetails = await profileService.getUserDetails(userId);
    res.status(200).json({
      message: "User details retrieved successfully",
      userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const Profile = await profileService.getProfile(userId);
    res.status(200).json({
      message: "User profile retrieved successfully",
      Profile,
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
    const contactDetails = await profileService.getUserContactDetails(userId);
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
    const experiences = await profileService.getUserExperiences(userId);
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
    const educations = await profileService.getUserEducations(userId);
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
    const projects = await profileService.getUserProjects(userId);
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
    const skills = await profileService.getUserSkills(userId);
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
    const testimonials = await profileService.getUserTestimonials(userId);
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
    await profileService.updateUserDetails(id, {
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
    await profileService.addContactDetails(id, {
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
    await profileService.addExperience(id, {
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
    await profileService.addEducation(id, {
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
    await profileService.addProject(id, {
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
    await profileService.addSkills(id, skills);
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
    await profileService.addTestimonial(id, {
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
