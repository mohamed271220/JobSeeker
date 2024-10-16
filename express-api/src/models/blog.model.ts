import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import Company from "./company.model";
import BlogTagAssociation from "./blogTagAssociation.model";
import BlogCategoryAssociation from "./blogCategoryAssociations.model";

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: string;
  declare company_id: string; // References Companies
  declare title: string;
  declare content: object; // Assuming content will be an object since it's JSONB
  declare featured_image?: string; // Optional
  declare publish_date?: Date; // Optional
  declare reading_time?: number; // Optional
  declare author_bio?: string; // Optional
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    featured_image: {
      type: DataTypes.TEXT,
    },
    publish_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reading_time: {
      type: DataTypes.INTEGER,
    },
    author_bio: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Blog",
    tableName: "Blogs",
  }
);

// Define associations
Blog.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Blog.hasMany(BlogTagAssociation, { foreignKey: "blog_id", as: "tags" });
Blog.hasMany(BlogCategoryAssociation, {
  foreignKey: "blog_id",
  as: "categories",
});

export default Blog;
