import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";

class BlogCategory extends Model<
  InferAttributes<BlogCategory>,
  InferCreationAttributes<BlogCategory>
> {
  declare id: string;
  declare name: string;
}

BlogCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BlogCategory",
    tableName: "BlogCategories",
  }
);

export default BlogCategory;
