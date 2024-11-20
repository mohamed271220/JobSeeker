import authRouter from "./features/auth/auth.route";
import roleRouter from "./features/role/role.route";
import ProfileRouter from "./features/profile/routes/profile.route";
import JobTagsRouter from "./features/JobTag/tag.route";
import skillsRouter from "./features/skill/skill.route";

import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);
router.use("/profile", ProfileRouter);
router.use("/job-tags", JobTagsRouter);
router.use("/skills", skillsRouter);

export default router;
