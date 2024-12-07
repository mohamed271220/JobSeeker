import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { addTestimonial, getUserTestimonials } from "../profile.controller";

const router = express.Router();

// Get user's testimonials
router.get("/:userId", getUserTestimonials);

// Add testimonial to another user
router.post("/:userId", authenticateToken, addTestimonial);

export default router;