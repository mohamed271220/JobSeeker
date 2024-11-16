import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { handleValidationErrors } from "../../utils/report-validators-errors";

export const validateSignup = [
  body("first_name").notEmpty().withMessage("First_name is required"),
  body("last_name").notEmpty().withMessage("Last_name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#]/)
    .withMessage(
      "Password must contain at least one special character (@$!%*?&#)"
    ),
  handleValidationErrors,
];

export const validateLogin = [
  body("email")
    .if(body("username").not().exists())
    .notEmpty()
    .withMessage("Email is required if username is not provided")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];
