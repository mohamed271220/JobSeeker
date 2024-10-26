import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../../../config/database";
import User from "../../../auth/models/user.model";
import Industry from "../../../industry/industry.model";

class CompanyRequest extends Model<
  InferAttributes<CompanyRequest>,
  InferCreationAttributes<CompanyRequest>
> {
  declare id: string; // Unique identifier for the request
  declare user_id: string; // ID of the user making the request
  declare name: string; // Proposed company name
  declare description?: string; // Company description
  declare industry_id?: string; // Optional industry ID
  declare profile_picture?: string; // URL of the profile picture
  declare website_url?: string; // Company website URL
  declare phone_number?: string; // Contact phone number
  declare address?: string; // Company address
  declare established_date?: Date; // Established date
  declare company_size?: string; // Size of the company
  declare mission_statement?: string; // Mission statement
  declare status: "pending" | "approved" | "rejected"; // Status of the request
  declare createdAt?: Date; // Date of request creation
  declare updatedAt?: Date; // Date of last update
  declare deletedAt?: Date; // Optional for paranoid deleting
}

// Initialize the CompanyRequest model
CompanyRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
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
    industry_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Industry,
        key: "id",
      },
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website_url: {
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    sequelize,
    modelName: "CompanyRequest",
    tableName: "CompanyRequests",
    timestamps: true,
    paranoid: true, // Enable paranoid deleting
  }
);

export default CompanyRequest;
