import authRouter from "./features/auth/auth.route";
import roleRouter from "./features/role/role.route";
import ProfileRouter from "./features/profile/profile.route";

import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/roles", roleRouter);
router.use("/profile", ProfileRouter);


export default router