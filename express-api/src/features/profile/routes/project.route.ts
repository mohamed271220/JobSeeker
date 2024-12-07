import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addProject, getUserProjects } from "../profile.controller";

const router = express.Router();

// Get user's projects
router.get("/:userId", getUserProjects);

// Add project
router.post("/", authenticateToken, addProject);

// Remove project
// router.delete("/", authenticateToken, removeProject);

export default router;