import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../../config/database";

class JobPost extends Model<
  InferAttributes<JobPost>,
  InferCreationAttributes<JobPost>
> {
  declare id: string;
  declare company_id: string;
  declare title: string;
  declare description: string;
  declare is_remote?: boolean;
  declare is_hybrid?: boolean;
  declare is_on_site?: boolean;
  declare industry_id?: string;
  declare filled?: boolean;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

JobPost.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_remote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_hybrid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_on_site: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    industry_id: {
      type: DataTypes.UUID,
    },
    filled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "JobPosts",
    modelName: "JobPost",
  }
);

// Associations

export default JobPost;
