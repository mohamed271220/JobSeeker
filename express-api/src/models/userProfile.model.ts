import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

class UserProfile extends Model<
  InferAttributes<UserProfile>,
  InferCreationAttributes<UserProfile>
> {
  declare user_id: string; // User ID as a foreign key
  declare experience?: object; // JSONB data can be represented as object
  declare education?: object; // JSONB data can be represented as object
  declare projects?: object; // JSONB data can be represented as object
  declare skills?: object; // JSONB data can be represented as object
  declare testimonials?: object; // JSONB data can be represented as object
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

// Initialize the UserProfile model
UserProfile.init(
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    experience: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    education: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    projects: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    testimonials: {
      type: DataTypes.JSONB,
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
    modelName: "UserProfile",
    tableName: "UserProfiles",
    timestamps: true,
  }
);

// Define associations
UserProfile.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default UserProfile;
