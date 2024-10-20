import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../config/database";


class DashboardData extends Model<
  InferAttributes<DashboardData>,
  InferCreationAttributes<DashboardData>
> {
  declare id: string;
  declare company_id: string;
  declare data: any; // JSONB data type can be represented as `any`
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

DashboardData.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "DashboardData",
    tableName: "DashboardData",
  }
);

// Define associations

export default DashboardData;
