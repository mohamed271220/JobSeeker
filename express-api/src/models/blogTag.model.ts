import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";

class BlogTag extends Model<
  InferAttributes<BlogTag>,
  InferCreationAttributes<BlogTag>
> {
  declare id: string;
  declare name: string;
}

BlogTag.init(
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
    modelName: "BlogTag",
    tableName: "BlogTags",
  }
);

export default BlogTag;
