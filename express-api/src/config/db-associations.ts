import sequelize from "./database";
import Application from "../features/job-application/models/application.model";
import ApplicationAnswer from "../features/job-application/models/application-answer.model";
import Contact from "../features/profile/models/contact-info.model";
import DashboardData from "../features/dashboard/dashboard-data.model";
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
import Tag from "../features/tag/tag.model";
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

export const models = {
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
  DashboardData,
  Education,
  Experience,
  Industry,
  JobPost,
  JobPostQuestion,
  JobPostSkill,
  JobPostTag,
  Project,
  Representative,
  Role,
  Skill,
  Tag,
  Testimonial,
  User,
  Profile,
  UserRole,
  UserSkill,
};

// Application associations
Application.belongsTo(JobPost, { foreignKey: "job_post_id", as: "jobPost" });
Application.belongsTo(User, { foreignKey: "user_id", as: "user" });
Application.hasMany(ApplicationAnswer, {
  foreignKey: "application_id",
  as: "answers",
});

// ApplicationAnswer associations
ApplicationAnswer.belongsTo(Application, {
  foreignKey: "application_id",
  as: "application",
});
ApplicationAnswer.belongsTo(JobPostQuestion, {
  foreignKey: "question_id",
  as: "question",
});

// Blog associations
Blog.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Blog.hasMany(BlogTagAssociation, { foreignKey: "blog_id", as: "tags" });
Blog.hasMany(BlogCategoryAssociation, {
  foreignKey: "blog_id",
  as: "categories",
});

// BlogCategoryAssociation associations
BlogCategoryAssociation.belongsTo(Blog, { foreignKey: "blog_id", as: "blog" });
BlogCategoryAssociation.belongsTo(BlogCategory, {
  foreignKey: "category_id",
  as: "category",
});

// BlogTagAssociation associations
BlogTagAssociation.belongsTo(Blog, { foreignKey: "blog_id", as: "blog" });
BlogTagAssociation.belongsTo(BlogTag, { foreignKey: "tag_id", as: "tag" });

// Company associations
Company.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
Company.belongsTo(Industry, { foreignKey: "industry_id", as: "industry" });
Company.hasMany(Representative, {
  foreignKey: "company_id",
  as: "representatives",
});
Company.belongsToMany(User, {
  through: Representative,
  foreignKey: "company_id",
  as: "users",
});
Company.hasMany(JobPost, { foreignKey: "company_id", as: "jobPosts" });
Company.hasMany(Blog, { foreignKey: "company_id", as: "blogs" });
Company.hasMany(DashboardData, {
  foreignKey: "company_id",
  as: "dashboardData",
});

// CompanyRequest associations
CompanyRequest.belongsTo(User, { foreignKey: "user_id", as: "user" });

// DashboardData associations
DashboardData.belongsTo(Company, { foreignKey: "company_id", as: "company" });

// Industry associations
Industry.hasMany(Company, { foreignKey: "industry_id", as: "companies" });
Industry.hasMany(JobPost, { foreignKey: "industry_id", as: "jobPosts" });

// JobPost associations
JobPost.belongsTo(Company, { foreignKey: "company_id", as: "company" });
JobPost.belongsTo(Industry, { foreignKey: "industry_id", as: "industry" });
JobPost.hasMany(JobPostSkill, { foreignKey: "job_post_id", as: "skills" });
JobPost.hasMany(JobPostTag, { foreignKey: "job_post_id", as: "tags" });
JobPost.hasMany(Application, { foreignKey: "job_post_id", as: "applications" });
JobPost.hasMany(JobPostQuestion, {
  foreignKey: "job_post_id",
  as: "questions",
});

// JobPostQuestion associations
JobPostQuestion.belongsTo(JobPost, {
  foreignKey: "job_post_id",
  as: "jobPost",
});
JobPostQuestion.hasMany(ApplicationAnswer, {
  foreignKey: "question_id",
  as: "answers",
});

// JobPostSkill associations
JobPostSkill.belongsTo(JobPost, { foreignKey: "job_post_id", as: "jobPost" });
JobPostSkill.belongsTo(Skill, { foreignKey: "skill_id", as: "skill" });

// JobPostTag associations
JobPostTag.belongsTo(JobPost, { foreignKey: "job_post_id", as: "jobPost" });
JobPostTag.belongsTo(Tag, { foreignKey: "tag_id", as: "tag" });

// Representative associations
Representative.belongsTo(User, { foreignKey: "user_id", as: "user" });
Representative.belongsTo(Company, { foreignKey: "company_id", as: "company" });

// Role associations
Role.hasMany(User, { foreignKey: "role_id", as: "users" });
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

// Skill associations
Skill.hasMany(JobPostSkill, { foreignKey: "skill_id", as: "jobPostSkills" });
Skill.belongsToMany(Profile, { through: UserSkill, as: "Profiles" });

// Tag associations
Tag.hasMany(JobPostTag, { foreignKey: "tag_id", as: "jobPostTags" });
Tag.hasMany(BlogTagAssociation, { foreignKey: "tag_id", as: "blogTags" });

// User associations
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
User.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
User.hasMany(Representative, { foreignKey: "user_id", as: "representatives" });
User.hasMany(Application, { foreignKey: "user_id", as: "applications" });
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});
User.hasOne(Contact, { foreignKey: "user_id", as: "contact" });
User.hasMany(Company, { foreignKey: "owner_id", as: "companies" });
User.hasMany(CompanyRequest, { foreignKey: "user_id", as: "companyRequests" });
User.hasMany(UserSkill, { foreignKey: "user_id", as: "userSkills" });

// Profile associations
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });
Profile.hasMany(Experience, { foreignKey: "user_id", as: "experiences" });
Profile.hasMany(Education, { foreignKey: "user_id", as: "educations" });
Profile.hasMany(Project, { foreignKey: "user_id", as: "projects" });
Profile.belongsToMany(Skill, { through: UserSkill, as: "skills" });
Profile.hasMany(Testimonial, {
  foreignKey: "receivedBy",
  as: "receivedTestimonials",
});
Profile.hasMany(Testimonial, {
  foreignKey: "givenBy",
  as: "givenTestimonials",
});

// UserRole associations
UserRole.belongsTo(User, { foreignKey: "user_id" });
UserRole.belongsTo(Role, { foreignKey: "role_id" });

// UserSkill associations
UserSkill.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserSkill.belongsTo(Skill, { foreignKey: "skill_id", as: "skill" });

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

export default models;
