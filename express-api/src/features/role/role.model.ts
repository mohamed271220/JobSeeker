import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../config/database";

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

export default Role;
