import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import UserRole from "./userRole";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: string;
  declare name: string;
}

// Initialize the Role model
Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "Roles",
    timestamps: false, // No createdAt or updatedAt fields in this table
  }
);

// Define associations
Role.hasMany(User, { foreignKey: "role_id", as: "users" });
// Role belongs to many Users through UserRole (Many-to-Many)
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
});

export default Role;
