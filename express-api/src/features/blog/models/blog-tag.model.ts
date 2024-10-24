import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../../config/database";
import Blog from "./blog.model";
import BlogTag from "../micro-features/tag/tag.model";

class BlogTagAssociation extends Model<
  InferAttributes<BlogTagAssociation>,
  InferCreationAttributes<BlogTagAssociation>
> {
  declare blog_id: string; // References Blogs
  declare tag_id: string; // References BlogTags
}

BlogTagAssociation.init(
  {
    blog_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: BlogTag,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "BlogTagAssociation",
    tableName: "BlogTagAssociations",
    timestamps: false,
  }
);

// Define associations

export default BlogTagAssociation;
