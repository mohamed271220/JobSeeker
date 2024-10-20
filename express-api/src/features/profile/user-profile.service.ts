import Contact from "./models/contact-info.model";
import Education from "./models/education.model";
import Experience from "./models/experience.model";
import Project from "./models/project.model";
import Skill from "../skill/skill.model";
import Testimonial from "./models/testimonial.model";
import User from "../shared/models/user.model";
import UserProfile from "./models/user-profile.model";
import { v4 as uuid } from "uuid";
import { CustomError } from "../../common/error-handlers/CustomError";
import UserSkill from "./models/user-skill.model";

export class UserProfileService {
  constructor(
    private userProfileModel: typeof UserProfile = UserProfile,
    private userModel: typeof User = User,
    private contactModel: typeof Contact = Contact,
    private experienceModel: typeof Experience = Experience,
    private educationModel: typeof Education = Education,
    private projectModel: typeof Project = Project,
    private skillModel: typeof Skill = Skill,
    private userSkillModel: typeof UserSkill = UserSkill,
    private testimonialModel: typeof Testimonial = Testimonial
  ) {}

  private async userIdExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findByPk(userId);
    return !!user;
  }

  async getUserDetails(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.userModel.findByPk(userId, {
      attributes: {
        exclude: ["password", "resetPasswordToken", "resetPasswordExpires"],
      },
      include: [
        {
          model: this.contactModel,
          as: "contact",
        },
      ],
    });
  }

  async getUserProfile(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.userProfileModel.findByPk(userId, {
      include: [
        {
          model: this.experienceModel,
          as: "experiences",
        },
        {
          model: this.educationModel,
          as: "educations",
        },
        {
          model: this.projectModel,
          as: "projects",
        },
        {
          model: this.skillModel,
          as: "skills",
        },
        {
          model: this.testimonialModel,
          as: "testimonials",
        },
      ],
    });
  }

  async getUserContactDetails(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.contactModel.findOne({ where: { user_id: userId } });
  }

  async getUserExperiences(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.experienceModel.findAll({ where: { user_id: userId } });
  }

  async getUserEducations(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.educationModel.findAll({ where: { user_id: userId } });
  }

  async getUserProjects(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.projectModel.findAll({ where: { user_id: userId } });
  }

  async getUserSkills(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.userProfileModel.findByPk(userId, {
      include: [
        {
          model: this.skillModel,
          as: "skills",
        },
      ],
    });
  }

  async getUserTestimonials(userId: string) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.testimonialModel.findAll({ where: { user_id: userId } });
  }

  async updateUserDetails(
    userId: string,
    userDetails: {
      first_name?: string;
      last_name?: string;
      bio?: string;
      profile_picture?: string;
      resume?: string;
      title?: string;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.userModel.update(userDetails, { where: { id: userId } });
  }

  async addContactDetails(
    userId: string,
    contactDetails: {
      phone_number?: string;
      address?: string;
      linkedin_url?: string;
      github_url?: string;
      website_url?: string;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.contactModel.create({
      ...contactDetails,
      user_id: userId,
      id: uuid(),
    });
  }

  async addExperience(
    userId: string,
    experienceDetails: {
      title: string;
      company: string;
      location: string;
      start_date: Date;
      end_date: Date;
      description: string;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.experienceModel.create({
      ...experienceDetails,
      user_id: userId,
      id: uuid(),
    });
  }

  async addEducation(
    userId: string,
    educationDetails: {
      institution: string;
      degree: string;
      startDate: Date;
      endDate: Date;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.educationModel.create({
      ...educationDetails,
      user_id: userId,
      id: uuid(),
    });
  }

  async addProject(
    userId: string,
    projectDetails: {
      title: string;
      description: string;
      startDate: Date;
      endDate?: Date;
      link?: string;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    return this.projectModel.create({
      ...projectDetails,
      user_id: userId,
      id: uuid(),
    });
  }

  async addSkills(userId: string, skills: string[]) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    // check if every skill exists in the skills table
    const skillsExist = await this.skillModel.findAll({
      where: { id: skills },
    });
    if (skillsExist.length !== skills.length) {
      throw new CustomError("One or more skills do not exist", 400);
    }
    // add skills to the user profile
    const userSkills = skills.map((skill) => ({
      id: uuid(),
      user_id: userId,
      skill_id: skill,
    }));
    return this.userSkillModel.bulkCreate(userSkills);
  }

  async addTestimonial(
    userId: string,
    testimonialDetails: {
      content: string;
      author: string;
      receivedBy: string;
    }
  ) {
    if (!(await this.userIdExists(userId))) {
      throw new CustomError("User not found", 404);
    }
    if (!(await this.userIdExists(testimonialDetails.receivedBy))) {
      throw new CustomError("Received by user not found", 404);
    }
    if (userId === testimonialDetails.receivedBy) {
      throw new CustomError("Cannot give a testimonial to yourself", 400);
    }

    return this.testimonialModel.create({
      ...testimonialDetails,
      givenBy: userId,
      id: uuid(),
    });
  }
}
