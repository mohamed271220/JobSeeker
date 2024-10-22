import express from "express";
import * as authController from "./auth.controller";
import { authenticateToken } from "../../middleware/auth-middleware";
import { validateLogin, validateSignup } from "./auth-validators";

const router = express.Router();
// /api/v1/auth

router.get("/profile", authenticateToken, authController.getProfile);

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);

router.get("/logout", authenticateToken, authController.logout);

router.get(
  "/validate-token",
  authenticateToken,
  authController.validateSession
);

router.get("/refresh-token", authenticateToken, authController.refreshToken);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password/:token", authController.resetPassword);

router.post(
  "/change-password",
  authenticateToken,
  authController.changePassword
);

export default router;
