// this file will handle all the routes for the company
import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";

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
} from "./company.controller";

import companyRequestRouter from "./micro-features/company-request/company-request.route";

const router = express.Router();

// Company initializing requests
router.use("/company-request", companyRequestRouter);

// Company
// admin
// admin shuts down a company page or owner can delete their company page
router.delete(
  "/:companyId",
  authenticateToken,
  authorizeRoles("admin", "user"),
  deleteCompany
);
// admin reopens a company page
router.patch(
  "/:companyId",
  authenticateToken,
  authorizeRoles("admin"),
  reopenCompany
);

// owner of a company page or it's representatives
// can update the company page
router.patch(
  "/:companyId/details",
  authenticateToken,
  authorizeRoles("user"),
  updateCompany
);
// owner can add a representative to the company page
router.post(
  "/:companyId/representatives",
  authenticateToken,
  authorizeRoles("user"),
  addRepresentative
);
// owner can remove a representative from the company page
router.delete(
  "/:companyId/representatives/:representativeId",
  authenticateToken,
  authorizeRoles("user"),
  removeRepresentative
);

// users
// get all companies and searching for companies by name
router.get("/", getCompanies);
// get the details of a company page
router.get("/:companyId", getCompany);
// get all companies the user is owner of
router.get("/owner", authenticateToken, getCompaniesByUser);
// get all companies the user is a representative
router.get("/representative", authenticateToken, getCompaniesByRepresentative);
// get all companies by industry
router.get("/industry/:industryId", getCompaniesByIndustry);

export default router;
