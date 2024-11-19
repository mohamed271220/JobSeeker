import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";
import {
  applyToAJob,
  getAllApplications,
  getApplication,
  getAllApplicationsCurrentUser,
  getAllApplicationsCurrentUserInCompany,
  rejectApplication,
  acceptApplication,
} from "../controllers/job-application.controller";

const router = express.Router();
// apply to a job
router.post("/apply", authenticateToken, authorizeRoles("user"), applyToAJob);

// get all applications for a job in a company that the user is an representative of the company or the owner of the company page
router.get(
  "/job/:jobId",
  authenticateToken,
  authorizeRoles("user"),
  getAllApplications
);

// get a certain application for a job in a company that the user is an representative of the company or the owner of the company page
router.get(
  "/:applicationId",
  authenticateToken,
  authorizeRoles("user"),
  getApplication
);

// get all applications that the user has applied to
router.get(
  "/current-user",
  authenticateToken,
  authorizeRoles("user"),
  getAllApplicationsCurrentUser
);

// get all applications that the user has applied to in a certain company
router.get(
  "/current-user/:companyId",
  authenticateToken,
  authorizeRoles("user"),
  getAllApplicationsCurrentUserInCompany
);

// reject an application for a job in a company that the user is an representative of the company or the owner of the company page
router.delete(
  "/:applicationId",
  authenticateToken,
  authorizeRoles("user"),
  rejectApplication
);

// accept an application for a job in a company that the user is an representative of the company or the owner of the company page
router.put(
  "/:applicationId",
  authenticateToken,
  authorizeRoles("user"),
  acceptApplication
);

export default router;
