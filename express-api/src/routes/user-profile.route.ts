import express from "express";
import {
  getUserDetails,
  getUserProfile,
  getUserContactDetails,
  getUserExperiences,
  getUserEducations,
  getUserProjects,
  getUserSkills,
  getUserTestimonials,
  updateUserDetails,
  addContactDetails,
  addExperience,
  addEducation,
  addProject,
  addSkills,
  addTestimonial,
} from "../controllers/user-profile.controller";
import { authenticateToken } from "../middleware/auth-middleware";

const router = express.Router();
// api/v1/user-profile

// Get user details (public profile, no authentication required to view) p.s. should be curated to not show sensitive information
router.get("/details/:userId", getUserDetails);

// Get user profile
router.get("/profile/:userId", getUserProfile);

// Get user's contact details
router.get("/contact/:userId", getUserContactDetails);

// Get user's experiences
router.get("/experiences/:userId", getUserExperiences);

// Get user's educations
router.get("/educations/:userId", getUserEducations);

// Get user's projects
router.get("/projects/:userId", getUserProjects);

// Get user's skills
router.get("/skills/:userId", getUserSkills);

// Get user's testimonials
router.get("/testimonials/:userId", getUserTestimonials);

// Update user details (name, bio, first_name, last_name, etc)
router.put("/details", authenticateToken, updateUserDetails);

// Add contact details
router.post("/contact", authenticateToken, addContactDetails);
// edit contact details
// router.put("/contact", authenticateToken, editContactDetails);

// Add experience
router.post("/experiences", authenticateToken, addExperience);
// remove experience
// router.delete("/experiences", authenticateToken, removeExperience);

// Add education
router.post("/educations", authenticateToken, addEducation);
// remove education
// router.delete("/educations", authenticateToken, removeEducation);

// Add project
router.post("/projects", authenticateToken, addProject);

// remove project
// router.delete("/projects", authenticateToken, removeProject);

// Add skill
router.post("/skills", authenticateToken, addSkills);

// remove skill
// router.delete("/skills", authenticateToken, removeSkill);


// Add testimonial to another user
router.post("/testimonials/:userId", authenticateToken, addTestimonial);

export default router;
