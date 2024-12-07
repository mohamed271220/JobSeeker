import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";

const router = express.Router();

// Post a job in a company that the user is an representative of the company or the owner of the company page
router.post("/posts", authenticateToken, authorizeRoles("user"));

// Edit a job post in a company that the user is an representative of the company or the owner of the company page
router.put("/posts/:id", authenticateToken, authorizeRoles("user"));

// Delete a job post in a company that the user is an representative of the company or the owner of the company page
router.delete("/posts/:id", authenticateToken, authorizeRoles("user"));

// mark a job post as filled in a company that the user is an representative of the company or the owner of the company page
router.put("/posts/filled/:id", authenticateToken, authorizeRoles("user"));

// Get a job post by id in a company
router.get("/posts/:id",);

// Get all job posts in a company
router.get("/posts",);

export default router;
