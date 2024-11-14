import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import BlogCategoryAssociation from "../../models/blog-category.model";

@Table({
  tableName: "BlogCategories",
})
class BlogCategory extends Model {
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

  @HasMany(() => BlogCategoryAssociation, {
    foreignKey: "category_id",
  })
  declare blogCategories: BlogCategoryAssociation[];
}

export default BlogCategory;
