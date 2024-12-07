import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addSkills, getUserSkills } from "../profile.controller";

const router = express.Router();

// Get user's skills
router.get("/:userId", getUserSkills);

// Add skill
router.post("/", authenticateToken, addSkills);

// Remove skill
// router.delete("/", authenticateToken, removeSkill);

export default router;