import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Testimonial extends Model {
  declare id: string;
  declare userProfileId: string; // FK to UserProfile
  declare content: string; // The testimonial content
  declare author: string; // The name of the author
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Testimonial.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
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
    modelName: "Testimonial",
    tableName: "Testimonials",
    timestamps: true,
  }
);

export default Testimonial;
