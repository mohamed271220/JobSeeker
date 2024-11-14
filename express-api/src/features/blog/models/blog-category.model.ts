import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import sequelize from "../../../config/database";
import Blog from "./blog.model";
import BlogCategory from "../micro-features/category/category.model";

@Table({
  tableName: "BlogCategoryAssociations",
  timestamps: false,
})
class BlogCategoryAssociation extends Model {
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

export default BlogCategoryAssociation;
