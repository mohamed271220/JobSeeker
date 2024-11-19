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
import BlogTag from "./blog-tag.model";

@Table({
  tableName: "BlogTagMappings",
  timestamps: false,
})
class BlogTagMapping extends Model {
  @ForeignKey(() => Blog)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare blog_id: string;

  @ForeignKey(() => BlogTag)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare tag_id: string;

  @BelongsTo(() => Blog, { foreignKey: "blog_id", as: "blog" })
  declare blog: Blog;

  @BelongsTo(() => BlogTag, { foreignKey: "tag_id", as: "tag" })
  declare tag: BlogTag;
}

export default BlogTagMapping;
