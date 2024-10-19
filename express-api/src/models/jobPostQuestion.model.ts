import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../config/database";
import JobPost from "./jobPost.model";

class JobPostQuestion extends Model<
  InferAttributes<JobPostQuestion>,
  InferCreationAttributes<JobPostQuestion>
> {
  declare id: string;
  declare job_post_id: string;
  declare question: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

JobPostQuestion.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    job_post_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: "JobPostQuestion",
    tableName: "JobPostQuestions",
  }
);

// Define associations


export default JobPostQuestion;
