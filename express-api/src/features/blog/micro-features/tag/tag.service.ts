import { v4 as uuid } from "uuid";
import BlogTag from "./tag.model";
import BlogTagAssociation from "../../models/blog-tag.model";
import Blog from "../../models/blog.model";

export class TagService {
  constructor(
    private tagModel: typeof BlogTag = BlogTag,
    private blogTagModel: typeof BlogTagAssociation = BlogTagAssociation,
    private blogPostModel: typeof Blog = Blog
  ) {}

  async createTag(body: { name: string }): Promise<BlogTag> {
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

  async getTags(): Promise<BlogTag[]> {
    return this.tagModel.findAll();
  }

  async getTag(
    tagId: string,
    includeBlogPosts = false
  ): Promise<BlogTag | null> {
    return this.tagModel.findByPk(tagId, {
      include: includeBlogPosts
        ? [
            {
              model: this.blogTagModel,
              as: "tags",
              include: [
                {
                  model: this.blogPostModel,
                  as: "blog",
                },
              ],
            },
          ]
        : undefined,
    });
  }
}
