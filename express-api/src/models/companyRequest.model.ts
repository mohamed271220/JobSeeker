import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Industry from "./industry.model";

class CompanyRequest extends Model<
  InferAttributes<CompanyRequest>,
  InferCreationAttributes<CompanyRequest>
> {
  declare id: string; // Unique identifier for the request
  declare userId: string; // ID of the user making the request
  declare name: string; // Proposed company name
  declare description?: string; // Company description
  declare industryId?: string; // Optional industry ID
  declare profilePicture?: string; // URL of the profile picture
  declare websiteUrl?: string; // Company website URL
  declare phone_number?: string; // Contact phone number
  declare address?: string; // Company address
  declare established_date?: Date; // Established date
  declare company_size?: string; // Size of the company
  declare mission_statement?: string; // Mission statement
  declare status: "pending" | "approved" | "rejected"; // Status of the request
  declare createdAt?: Date; // Date of request creation
  declare updatedAt?: Date; // Date of last update
}

// Initialize the CompanyRequest model
CompanyRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    industryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Industry,
        key: "id",
      },
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    websiteUrl: {
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
    established_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    company_size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    mission_statement: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
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
    modelName: "CompanyRequest",
    tableName: "CompanyRequests",
    timestamps: true,
  }
);

CompanyRequest.belongsTo(User, { foreignKey: "userId", as: "user" });

export default CompanyRequest;
