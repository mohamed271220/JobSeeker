import JobPostTag from "../job-post/models/job-post-tag.model";
import JobPost from "../job-post/models/job-post.model";
import Tag from "./tag.model";
import { v4 as uuid } from "uuid";

export class TagService {
  constructor(
    private tagModel: typeof Tag = Tag,
    private jobPostModel: typeof JobPost = JobPost,
    private jobPostTagModel: typeof JobPostTag = JobPostTag
  ) {}

  async createTag(body: { name: string }): Promise<Tag> {
    return this.tagModel.create({
      id: uuid(),
      name: body.name,
    });
  }

  async updateTag(tagId: string, body: { name: string }): Promise<[number]> {
    return this.tagModel.update(body, { where: { id: tagId } });
  }

  async deleteTag(tagId: string): Promise<number> {
    return this.tagModel.destroy({ where: { id: tagId } });
  }

  async getTags(): Promise<Tag[]> {
    return this.tagModel.findAll();
  }

  async getTag(tagId: string, includeJobPosts = false): Promise<Tag | null> {
    return this.tagModel.findByPk(tagId, {
      include: includeJobPosts
        ? [
            {
              model: this.jobPostTagModel,
              as: "jobPostTags",
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
