// this file will handle all the routes for  tags of the job board application.
import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";
import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "./tag.controller";

const router = express.Router();

// admin can add tag
router.post("/", authenticateToken, authorizeRoles("admin"), createTag);

// admin can edit tag
router.put("/:tagId", authenticateToken, authorizeRoles("admin"), updateTag);

// admin can delete tag
router.delete("/:tagId", authenticateToken, authorizeRoles("admin"), deleteTag);

// get all tags
router.get("/", getTags);

// get a tag by id
router.get("/:tagId", getTag);

export default router;
