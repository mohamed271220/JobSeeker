import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";
import {
  getCompanyRequests,
  getCompanyRequestById,
  approveCompanyRequest,
  rejectCompanyRequest,
  deleteCompanyRequest,
  applyForCompanyRequest,
  getMyCompanyRequests,
} from "../controllers/company-request.controller";

const router = express.Router();

// Admin gets all company requests by search or by status
router.get("/", authenticateToken, authorizeRoles("admin"), getCompanyRequests);

// Admin gets a company request by id
router.get(
  "/:requestId",
  authenticateToken,
  authorizeRoles("admin"),
  getCompanyRequestById
);

// Admin approves a company request
router.patch(
  "/:requestId/approve",
  authenticateToken,
  authorizeRoles("admin"),
  approveCompanyRequest
);

// Admin rejects a company request
router.patch(
  "/:requestId/reject",
  authenticateToken,
  authorizeRoles("admin"),
  rejectCompanyRequest
);

// Admin deletes a company request
router.delete(
  "/:requestId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCompanyRequest
);

// User applies for a company request
router.post(
  "/apply",
  authenticateToken,
  authorizeRoles("user"),
  applyForCompanyRequest
);

// User gets all company requests that they applied for
router.get(
  "/my-requests",
  authenticateToken,
  authorizeRoles("user"),
  getMyCompanyRequests
);

export default router;
