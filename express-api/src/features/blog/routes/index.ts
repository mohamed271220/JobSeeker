import express from "express";
import tagRouter from "./tag.route";
import categoryRouter from "./category.route";
import blogRouter from "./blog.route";

const router = express.Router();

// micro feature blog
// blog's tag
router.use("/tags", tagRouter);

// blog's category
router.use("/categories", categoryRouter);

// blog's post
router.use("/posts", blogRouter);

export default router;
