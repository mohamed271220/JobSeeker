import Application from "../features/job-application/models/application.model";
import ApplicationAnswer from "../features/job-application/models/application-answer.model";
import Contact from "../features/profile/models/contact-info.model";
import Education from "../features/profile/models/education.model";
import Experience from "../features/profile/models/experience.model";
import Industry from "../features/industry/industry.model";
import JobPost from "../features/job-post/models/job-post.model";
import JobPostQuestion from "../features/job-post/models/job-post-question.model";
import JobPostSkill from "../features/job-post/models/job-post-skill.model";
import JobPostTag from "../features/job-post/models/job-post-tag.model";
import Project from "../features/profile/models/project.model";
import Role from "../features/role/role.model";
import Skill from "../features/skill/skill.model";
import JobTag from "../features/JobTag/tag.model";
import Testimonial from "../features/profile/models/testimonial.model";
import User from "../features/auth/models/user.model";
import Profile from "../features/profile/models/profile.model";
import UserRole from "../features/auth/models/user-role.model";
import UserSkill from "../features/profile/models/user-skill.model";
import Blog from "../features/blog/models/blog.model";
import BlogCategory from "../features/blog/micro-features/category/category.model";
import BlogCategoryAssociation from "../features/blog/models/blog-category.model";
import BlogTag from "../features/blog/micro-features/tag/tag.model";
import BlogTagAssociation from "../features/blog/models/blog-tag.model";
import Company from "../features/company/models/company.model";
import CompanyRequest from "../features/company/micro-features/company-request/company-request.model";
import Representative from "../features/company/models/representative.model";

export const models = [
  Application,
  ApplicationAnswer,
  Blog,
  BlogCategory,
  BlogCategoryAssociation,
  BlogTag,
  BlogTagAssociation,
  Company,
  CompanyRequest,
  Contact,
  Education,
  Experience,
  Industry,
  JobPost,
  JobPostQuestion,
  JobPostSkill,
  JobPostTag,
  Project,
  UserRole,
  Representative,
  Role,
  Skill,
  JobTag,
  Testimonial,
  User,
  Profile,
  UserSkill,
];
