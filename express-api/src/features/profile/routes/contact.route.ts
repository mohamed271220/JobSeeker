import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addContactDetails, getUserContactDetails } from "../profile.controller";

const router = express.Router();

// Get user's contact details
router.get("/:userId", getUserContactDetails);

// Add contact details
router.post("/", authenticateToken, addContactDetails);

// Edit contact details
// router.put("/", authenticateToken, editContactDetails);

export default router;