import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addEducation, getUserEducations } from "../profile.controller";

const router = express.Router();

// Get user's educations
router.get("/:userId", getUserEducations);

// Add education
router.post("/", authenticateToken, addEducation);

// Remove education
// router.delete("/", authenticateToken, removeEducation);

export default router;
