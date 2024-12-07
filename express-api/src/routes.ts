import authRouter from "./features/auth/auth.route";
import roleRouter from "./features/role/role.route";
import ProfileRouter from "./features/profile/routes";
import JobsRouter from "./features/job-post/routes";
import skillsRouter from "./features/skill/skill.route";
import industriesRouter from "./features/industry/industry.route";
import companyRouter from "./features/company/routes";

import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);
router.use("/profile", ProfileRouter);
router.use("/jobs", JobsRouter);
router.use("/skills", skillsRouter);
router.use("/industries", industriesRouter);
router.use("/companies", companyRouter);

export default router;
