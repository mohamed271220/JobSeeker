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
import BlogTag from "../micro-features/tag/tag.model";

@Table({
  tableName: "BlogTagAssociations",
  timestamps: false,
})
class BlogTagAssociation extends Model {
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

export default BlogTagAssociation;
