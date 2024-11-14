import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Company from "../../company/models/company.model";
import BlogTagAssociation from "./blog-tag.model";
import BlogCategoryAssociation from "./blog-category.model";

@Table({
  tableName: "Blogs",
  timestamps: true,
})
class Blog extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare company_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  declare content: object;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare featured_image?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare publish_date?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare reading_time?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare author_bio?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt?: Date;

  @BelongsTo(() => Company, { foreignKey: "company_id", as: "company" })
  declare company: Company;

  @HasMany(() => BlogTagAssociation, { foreignKey: "blog_id", as: "tags" })
  declare tags: BlogTagAssociation[];

  @HasMany(() => BlogCategoryAssociation, {
    foreignKey: "blog_id",
    as: "categories",
  })
  declare categories: BlogCategoryAssociation[];
}

export default Blog;
