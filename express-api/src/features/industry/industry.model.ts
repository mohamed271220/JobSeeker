import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../config/database";

class Industry extends Model<
  InferAttributes<Industry>,
  InferCreationAttributes<Industry>
> {
  declare id: string;
  declare name: string;
}

// Initialize the Industry model
Industry.init(
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
    modelName: "Industry",
    tableName: "Industries",
    timestamps: false,
  }
);

// Define associations

export default Industry;
