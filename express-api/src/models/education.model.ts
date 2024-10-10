import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Education extends Model {
  declare id: string;
  declare userProfileId: string; // FK to UserProfile
  declare institution: string;
  declare degree: string;
  declare startDate: Date;
  declare endDate: Date;
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
    userProfileId: {
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
