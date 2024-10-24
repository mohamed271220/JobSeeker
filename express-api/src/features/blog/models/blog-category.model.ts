import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../../config/database";
import Blog from "./blog.model";
import BlogCategory from "../micro-features/category/category.model";

class BlogCategoryAssociation extends Model<
  InferAttributes<BlogCategoryAssociation>,
  InferCreationAttributes<BlogCategoryAssociation>
> {
  declare blog_id: string; // References Blogs
  declare category_id: string; // References BlogCategories
}

BlogCategoryAssociation.init(
  {
    blog_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BlogCategory,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "BlogCategoryAssociation",
    tableName: "BlogCategoryAssociations",
    timestamps: false,
  }
);

// Define associations

export default BlogCategoryAssociation;
