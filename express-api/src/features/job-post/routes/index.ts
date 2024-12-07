import express from "express";
import jopPostRouter from "./job-post.route";

const router = express.Router();

router.use("/posts", jopPostRouter);
router.use("/applications", jopPostRouter);
router.use("/tags", jopPostRouter);

export default router;
