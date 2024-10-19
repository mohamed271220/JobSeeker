import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Experience extends Model {
  declare id: string;
  declare user_id: string; // FK to UserProfile
  declare role: string;
  declare company: string;
  declare startDate: Date;
  declare endDate: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Experience.init(
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
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
    modelName: "Experience",
    tableName: "Experiences",
    timestamps: true,
  }
);



export default Experience;
