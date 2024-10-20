import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../../../config/database";

class ApplicationAnswer extends Model<
  InferAttributes<ApplicationAnswer>,
  InferCreationAttributes<ApplicationAnswer>
> {
  declare id: string;
  declare application_id: string;
  declare question_id: string;
  declare answer: string;
  declare createdAt?: Date;
}

ApplicationAnswer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    application_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ApplicationAnswer",
    tableName: "ApplicationAnswers",
  }
);

// Define associations

export default ApplicationAnswer;
