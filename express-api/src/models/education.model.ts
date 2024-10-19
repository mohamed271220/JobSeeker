import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Education extends Model {
  declare id: string;
  declare user_id: string; // FK to UserProfile
  declare institution: string;
  declare degree: string;
  declare startDate: Date;
  declare endDate: Date;
  declare grade: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Education.init(
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
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "Education",
    tableName: "Educations",
    timestamps: true,
  }
);

export default Education;
