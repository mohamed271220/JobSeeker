import express from "express";
import companyRouter from "./company.route";
import companyRequestRouter from "./company-request.route";

const router = express.Router();

// Company routes
router.use("/", companyRouter);
// Company initializing requests
router.use("/requests", companyRequestRouter);

export default router;
