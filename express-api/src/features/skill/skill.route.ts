import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";
import {
  createSkill,
  deleteSkill,
  getSkill,
  getSkills,
  updateSkill,
} from "./skill.controller";

const router = express.Router();

// admin can add skill
router.post("/", authenticateToken, authorizeRoles("admin"), createSkill);

// admin can edit skill
router.put(
  "/:skillId",
  authenticateToken,
  authorizeRoles("admin"),
  updateSkill
);

// admin can delete skill
router.delete(
  "/:skillId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSkill
);

// get all skills
router.get("/", getSkills);

// get skill by id
router.get("/:skillId", getSkill);

export default router;
