import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";

const router = express.Router();

// admin can add blog category
router.post("/", authenticateToken, authorizeRoles("admin"), createCategory);

// admin can edit blog category
router.put(
  "/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategory
);

// admin can delete category
router.delete(
  "/:categoryId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategory
);

// get all categories
router.get("/", getCategories);

// get a category by id
router.get("/:categoryId", getCategory);

export default router;
