import express from "express";
import contactRouter from "./contact.route";
import educationRouter from "./education.route";
import experienceRouter from "./experience.route";
import projectRouter from "./project.route";
import skillRouter from "./skill.route";
import testimonialRouter from "./testimonial.route";
import userRouter from "./user.route";

const router = express.Router();

router.use("/contact", contactRouter);
router.use("/educations", educationRouter);
router.use("/experiences", experienceRouter);
router.use("/projects", projectRouter);
router.use("/skills", skillRouter);
router.use("/testimonials", testimonialRouter);
router.use("/user", userRouter);

export default router;
