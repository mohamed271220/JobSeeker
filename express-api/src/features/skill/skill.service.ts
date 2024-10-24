import JobPostSkill from "../job-post/models/job-post-skill.model";
import JobPost from "../job-post/models/job-post.model";
import Skill from "./skill.model";
import { v4 as uuid } from "uuid";

export class SkillService {
  constructor(
    private skillModel: typeof Skill = Skill,
    private jobPostSkillModel: typeof JobPostSkill = JobPostSkill,
    private jobPostModel: typeof JobPost = JobPost
  ) {}

  async createSkill(body: { name: string }): Promise<Skill> {
    return this.skillModel.create({
      id: uuid(),
      name: body.name,
    });
  }

  async updateSkill(
    skillId: string,
    body: { name: string }
  ): Promise<[number]> {
    return this.skillModel.update(body, { where: { id: skillId } });
  }

  async deleteSkill(skillId: string): Promise<number> {
    return this.skillModel.destroy({ where: { id: skillId } });
  }

  async getSkills(): Promise<Skill[]> {
    return this.skillModel.findAll();
  }

  async getSkill(
    skillId: string,
    includeJobPosts = false
  ): Promise<Skill | null> {
    return this.skillModel.findByPk(skillId, {
      include: includeJobPosts
        ? [
            {
              model: this.jobPostSkillModel,
              as: "jobPostSkills",
              include: [
                {
                  model: this.jobPostModel,
                  as: "jobPost",
                },
              ],
            },
          ]
        : undefined,
    });
  }
}
