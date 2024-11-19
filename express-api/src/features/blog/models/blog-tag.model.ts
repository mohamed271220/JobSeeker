import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import BlogTagAssociation from "./blog-tag.model-mapping";

@Table({
  tableName: "BlogTags",
})
class BlogTag extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => BlogTagAssociation, { foreignKey: "tag_id", as: "blogTags" })
  declare blogTags: BlogTagAssociation[];
}

export default BlogTag;
