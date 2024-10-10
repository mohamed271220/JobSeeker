import sequelize from "../config/database";
import Application from "./application.model";
import ApplicationAnswer from "./applicationAnswer.model";
import Blog from "./blog.model";
import BlogCategory from "./blogCategory.model";
import BlogCategoryAssociation from "./blogCategoryAssociations.model";
import BlogTag from "./blogTag.model";
import BlogTagAssociation from "./blogTagAssociation.model";
import Company from "./company.model";
import Contact from "./contact-info.model";
import DashboardData from "./dashboardData.model";
import Education from "./education.model";
import Experience from "./experience.model";
import Industry from "./industry.model";
import JobPost from "./jobPost.model";
import JobPostQuestion from "./jobPostQuestion.model";
import JobPostSkill from "./jobPostSkill.model";
import JobPostTag from "./jobPostTag.model";
import Project from "./project.model";
import Representative from "./representative.model";
import Role from "./role.model";
import Skill from "./skill.model";
import Tag from "./tag.model";
import Testimonial from "./testimonial.model";
import User from "./user.model";
import UserProfile from "./userProfile.model";
import UserRole from "./userRole";

export const models = {
  Application,
  ApplicationAnswer,
  Blog,
  BlogCategory,
  BlogCategoryAssociation,
  BlogTag,
  BlogTagAssociation,
  Company,
  Contact,
  DashboardData,
  Education,
  Experience,
  Industry,
  JobPost,
  JobPostQuestion,
  JobPostSkill, // required skills for a job
  JobPostTag,
  Project,
  Representative,
  Role,
  Skill,
  Tag,
  Testimonial,
  User,
  UserProfile,
  UserRole,
};

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

export default models;
