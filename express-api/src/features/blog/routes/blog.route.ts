import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";

const router = express.Router();

// an creator of a company or a representative  can create a blog post

// an creator of a company or a representative  can edit their blog post

// an creator of a company or a representative  can delete their blog post

// get all blog posts

// get a blog post by id

// admin can delete blog post

export default router;
