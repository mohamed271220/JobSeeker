import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";
import {
  createIndustry,
  deleteIndustry,
  getIndustry,
  getIndustries,
  updateIndustry,
} from "./industry.controller";

const router = express.Router();

// admin can add industry
router.post("/", authenticateToken, authorizeRoles("admin"), createIndustry);

// admin can edit industry
router.put(
  "/:industryId",
  authenticateToken,
  authorizeRoles("admin"),
  updateIndustry
);

// admin can delete industry
router.delete(
  "/:industryId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteIndustry
);

// get all industries
router.get("/", getIndustries);

// get industry by id
router.get("/:industryId", getIndustry);

export default router;
