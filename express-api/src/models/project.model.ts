import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Project extends Model {
  declare id: string;
  declare user_id: string; // FK to UserProfile
  declare title: string;
  declare description: string;
  declare startDate: Date;
  declare endDate?: Date; // Optional
  declare link?: string; // Optional link to the project
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "UserProfiles",
        key: "user_id",
      },
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // This field can be null
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true, // Optional link to the project
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "Projects",
    timestamps: true,
  }
);

export default Project;
