import express from "express";
import jopPostRouter from "./job-post.route";

const router = express.Router();

router.use("/job-post", jopPostRouter);
router.use("/job-application", jopPostRouter);

export default router;
