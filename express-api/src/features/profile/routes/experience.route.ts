import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addExperience, getUserExperiences } from "../profile.controller";

const router = express.Router();

// Get user's experiences
router.get("/:userId", getUserExperiences);

// Add experience
router.post("/", authenticateToken, addExperience);

// Remove experience
// router.delete("/", authenticateToken, removeExperience);

export default router;