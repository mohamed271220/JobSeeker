import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Application from './application.model';
import JobPostQuestion from './jobPostQuestion.model';

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
    modelName: 'ApplicationAnswer',
    tableName: 'ApplicationAnswers',
  }
);

// Define associations
ApplicationAnswer.belongsTo(Application, { foreignKey: 'application_id', as: 'application' });
ApplicationAnswer.belongsTo(JobPostQuestion, { foreignKey: 'question_id', as: 'question' });

export default ApplicationAnswer;
