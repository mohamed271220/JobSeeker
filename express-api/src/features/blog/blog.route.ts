import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";

import tagRouter from "./micro-features/tag/tag.route";
import categoryRouter from "./micro-features/category/category.route";

const router = express.Router();

// micro feature blog
// blog's tag
router.use("/tags", tagRouter);

// blog's category
router.use("/categories", categoryRouter);

// an creator of a company or a representative  can create a blog post

// an creator of a company or a representative  can edit their blog post

// an creator of a company or a representative  can delete their blog post

// get all blog posts

// get a blog post by id

// admin can delete blog post

export default router;
