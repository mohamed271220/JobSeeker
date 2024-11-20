import { NextFunction, Request, Response } from "express";
import { userRequest } from "../../interfaces";
import { SkillService } from "./skill.service";

const skillService = new SkillService();

export const createSkill = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const skill = await skillService.createSkill({ name });
    res.status(201).json({ message: "Added the skill successfully", skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const skill = await skillService.updateSkill(req.params.skillId, { name });
    res.status(200).json({ message: "Updated the skill successfully", skill });
  } catch (error) {
    next(error);
  }
};
export const deleteSkill = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await skillService.deleteSkill(req.params.skillId);
    res.status(200).json({ message: "Deleted the skill successfully" });
  } catch (error) {
    next(error);
  }
};
export const getSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skills = await skillService.getSkills();
    res.status(200).json({ message: "Fetched skills successfully", skills });
  } catch (error) {
    next(error);
  }
};
export const getSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const includeJobPosts = req.query.includeJobPosts === "true";
    const skill = await skillService.getSkill(
      req.params.skillId,
      includeJobPosts
    );
    res.status(200).json({ message: "Fetched skill successfully", skill });
  } catch (error) {
    next(error);
  }
};
