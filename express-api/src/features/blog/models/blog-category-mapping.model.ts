import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import sequelize from "../../../config/database";
import Blog from "./blog-post.model";
import BlogCategory from "./blog-category.model";

@Table({
  tableName: "BlogCategoryMappings",
  timestamps: false,
})
class BlogCategoryMapping extends Model {
  @ForeignKey(() => Blog)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare blog_id: string;

  @ForeignKey(() => BlogCategory)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare category_id: string;

  @BelongsTo(() => Blog, { foreignKey: "blog_id", as: "blog" })
  declare blog: Blog;

  @BelongsTo(() => BlogCategory, { foreignKey: "category_id", as: "category" })
  declare category: BlogCategory;
}

export default BlogCategoryMapping;
