import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { getUserDetails, getProfile, updateUserDetails } from "../profile.controller";

const router = express.Router();

// Get user details (public profile, no authentication required to view)
router.get("/details/:userId", getUserDetails);

// Get user profile
router.get("/:userId", getProfile);

// Update user details (name, bio, first_name, last_name, etc)
router.put("/details", authenticateToken, updateUserDetails);

export default router;