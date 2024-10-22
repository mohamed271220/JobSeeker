import express from "express";
import { authenticateToken } from "../../middleware/auth-middleware";
import { authorizeRoles } from "../../middleware/role-middleware";
import * as roleController from "./role.controller";
import { updateRoleValidators } from "./role.validators";

// /api/v1/roles
const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("superadmin"),
  roleController.createRole
);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  roleController.getRoles
);

router.get(
  "/:roleId",
  authenticateToken,
  authorizeRoles("superadmin", "admin"),
  roleController.getRole
);

router.put(
  "/:roleId",
  authenticateToken,
  authorizeRoles("superadmin"),
  updateRoleValidators,
  roleController.updateRole
);

router.delete(
  "/:roleId",
  authenticateToken,
  authorizeRoles("superadmin"),
  roleController.deleteRole
);

export default router;
