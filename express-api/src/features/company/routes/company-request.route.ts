// this file will handle all the routes for the company
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

// Company initiating requests
// admin gets all company requests by search or by status
router.get("/", authenticateToken, authorizeRoles("admin"), getCompanyRequests);

// admin gets a company request by id
router.get(
  "/:requestId",
  authenticateToken,
  authorizeRoles("admin"),
  getCompanyRequestById
);

// admin approves a company request
router.patch(
  "/:requestId/approve",
  authenticateToken,
  authorizeRoles("admin"),
  approveCompanyRequest
);

// admin rejects a company request
router.patch(
  "/:requestId/reject",
  authenticateToken,
  authorizeRoles("admin"),
  rejectCompanyRequest
);

// admin deletes a company request
router.delete(
  "/:requestId",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCompanyRequest
);

// user applies for a company request
router.post(
  "/create-company",
  authenticateToken,
  authorizeRoles("user"),
  applyForCompanyRequest
);

// user gets all company requests that they applied for
router.get(
  "/my-requests",
  authenticateToken,
  authorizeRoles("user"),
  getMyCompanyRequests
);

export default router;
