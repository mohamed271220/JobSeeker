import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import User from "../../auth/models/user.model";
import Industry from "../../industry/industry.model";
import sequelize from "../../../config/database";
import CompanyRequest from "../micro-features/company-request/company-request.model";

class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare id: string;
  declare request_id: string;
  declare name: string;
  declare owner_id: string;
  declare description?: string;
  declare industry_id?: string; // Optional
  declare profile_picture?: string; // Optional
  declare website_url?: string; // Optional
  declare phone_number?: string; // Optional
  declare address?: string; // Optional
  declare established_date?: Date; // Optional
  declare company_size?: string; // Optional
  declare mission_statement?: string; // Optional
  declare facebook_url?: string; // Optional
  declare linkedin_url?: string; // Optional
  declare twitter_url?: string; // Optional
  declare benefits?: string; // Optional
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare deletedAt?: Date; // Optional for paranoid deleting
}

// Initialize the Company model
Company.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    request_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CompanyRequest,
        key: "id",
      },
    },
    owner_id: {
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
    facebook_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedin_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    twitter_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    benefits: {
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    sequelize,
    modelName: "Company",
    tableName: "Companies",
    timestamps: true,
    paranoid: true, // Enable paranoid deleting
  }
);

// Define associations
export default Company;