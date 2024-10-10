import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Experience from "./experience.model";
import Education from "./education.model";
import Project from "./project.model";
import Skill from "./skill.model";
import Testimonial from "./testimonial.model";

class UserProfile extends Model<
  InferAttributes<UserProfile>,
  InferCreationAttributes<UserProfile>
> {
  declare user_id: string; // User ID as a foreign key
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
UserProfile.hasMany(Experience, {
  foreignKey: "userProfileId",
  as: "experiences",
});
UserProfile.hasMany(Education, {
  foreignKey: "userProfileId",
  as: "educations",
});
UserProfile.hasMany(Project, { foreignKey: "userProfileId", as: "projects" });
UserProfile.hasMany(Skill, { foreignKey: "userProfileId", as: "skills" });
UserProfile.hasMany(Testimonial, {
  foreignKey: "userProfileId",
  as: "testimonials",
});

export default UserProfile;
