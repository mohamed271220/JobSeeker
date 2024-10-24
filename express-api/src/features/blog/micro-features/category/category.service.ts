import { v4 as uuid } from "uuid";
import BlogCategory from "./category.model";
import BlogCategoryAssociation from "../../models/blog-category.model";
import Blog from "../../models/blog.model";

export class CategoryService {
  constructor(
    private categoryModel: typeof BlogCategory = BlogCategory,
    private blogCategoryModel: typeof BlogCategoryAssociation = BlogCategoryAssociation,
    private blogPostModel: typeof Blog = Blog
  ) {}

  async createCategory(body: { name: string }): Promise<BlogCategory> {
    return this.categoryModel.create({
      id: uuid(),
      name: body.name,
    });
  }

  async updateCategory(categoryId: string, body: { name: string }): Promise<[number]> {
    return this.categoryModel.update(body, { where: { id: categoryId } });
  }

  async deleteCategory(categoryId: string): Promise<number> {
    return this.categoryModel.destroy({ where: { id: categoryId } });
  }

  async getCategories(): Promise<BlogCategory[]> {
    return this.categoryModel.findAll();
  }

  async getCategory(
    categoryId: string,
    includeBlogPosts = false
  ): Promise<BlogCategory | null> {
    return this.categoryModel.findByPk(categoryId, {
      include: includeBlogPosts
        ? [
            {
              model: this.blogCategoryModel,
              as: "categories",
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
