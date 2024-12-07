import express from "express";
import { authenticateToken } from "../../../middleware/auth-middleware";
import { authorizeRoles } from "../../../middleware/role-middleware";
import {
  deleteCompany,
  reopenCompany,
  updateCompany,
  addRepresentative,
  removeRepresentative,
  getCompanies,
  getCompany,
  getCompaniesByUser,
  getCompaniesByIndustry,
  getCompaniesByRepresentative,
} from "../controllers/company.controller";

const router = express.Router();


// Admin shuts down a company page or owner can delete their company page
router.delete(
  "/:companyId",
  authenticateToken,
  authorizeRoles("admin", "user"),
  deleteCompany
);

// Admin reopens a company page
router.patch(
  "/:companyId/reopen",
  authenticateToken,
  authorizeRoles("admin"),
  reopenCompany
);

// Owner of a company page or its representatives can update the company page
router.patch(
  "/:companyId/details",
  authenticateToken,
  authorizeRoles("user"),
  updateCompany
);

// Owner can add a representative to the company page
router.post(
  "/:companyId/representatives",
  authenticateToken,
  authorizeRoles("user"),
  addRepresentative
);

// Owner can remove a representative from the company page
router.delete(
  "/:companyId/representatives/:representativeId",
  authenticateToken,
  authorizeRoles("user"),
  removeRepresentative
);

// Users can get all companies and search for companies by name
router.get("/", getCompanies);

// Get the details of a company page
router.get("/:companyId", getCompany);

// Get all companies the user is owner of
router.get("/owner", authenticateToken, getCompaniesByUser);

// Get all companies the user is a representative of
router.get("/representative", authenticateToken, getCompaniesByRepresentative);

// Get all companies by industry
router.get("/industry/:industryId", getCompaniesByIndustry);

export default router;
