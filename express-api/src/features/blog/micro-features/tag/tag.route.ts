import express from "express";

import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "./tag.controller";
import { authenticateToken } from "../../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../../middleware/role-middleware";

const router = express.Router();

// admin can add blog tag
router.post("/", authenticateToken, authorizeRoles("admin"), createTag);

// admin can edit blog tag
router.put("/:tagId", authenticateToken, authorizeRoles("admin"), updateTag);

// admin can delete tag
router.delete("/:tagId", authenticateToken, authorizeRoles("admin"), deleteTag);

// get all tags
router.get("/", getTags);

// get a tag by id
router.get("/:tagId", getTag);

export default router;
