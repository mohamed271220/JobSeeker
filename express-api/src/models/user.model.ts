import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import Role from "./role.model";
import UserProfile from "./userProfile.model";
import Representative from "./representative.model";
import Application from "./application.model";
import UserRole from "./userRole";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare first_name: string;
  declare last_name: string;
  declare role_id?: string; // Optional as it may be null
  declare profile_picture?: string; // Optional
  declare resume?: string; // Optional
  declare title?: string; // Optional
  declare bio?: string; // Optional
  declare phone_number?: string; // Optional
  declare address?: string; // Optional
  declare linkedin_url?: string; // Optional
  declare github_url?: string; // Optional
  declare website_url?: string; // Optional
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedin_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    github_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website_url: {
      type: DataTypes.TEXT,
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
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

// Define associations
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
User.hasOne(UserProfile, { foreignKey: "user_id", as: "profile" });
User.hasMany(Representative, { foreignKey: "user_id", as: "representatives" });
User.hasMany(Application, { foreignKey: "user_id", as: "applications" });
// User belongs to many Roles through UserRole (Many-to-Many)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
});

export default User;
