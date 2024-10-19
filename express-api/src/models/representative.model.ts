import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Company from "./company.model";

class Representative extends Model<
  InferAttributes<Representative>,
  InferCreationAttributes<Representative>
> {
  declare user_id: string; // User ID as a foreign key
  declare company_id: string; // Company ID as a foreign key
}

// Initialize the Representative model
Representative.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Company,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Representative",
    tableName: "Representatives",
    timestamps: false, // No createdAt or updatedAt fields in this table
  }
);

// Define associations

export default Representative;
