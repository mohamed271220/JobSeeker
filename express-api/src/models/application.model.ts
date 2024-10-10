import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import JobPost from './jobPost.model';
import User from './user.model';

class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: string;
  declare job_post_id: string;
  declare user_id: string;
  declare submitted_at?: Date;
  declare reviewed?: boolean;
  declare feedback?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Application.init(
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reviewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    feedback: {
      type: DataTypes.TEXT,
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
    modelName: 'Application',
    tableName: 'Applications',
  }
);

// Define associations
Application.belongsTo(JobPost, { foreignKey: 'job_post_id', as: 'jobPost' });
Application.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Application;
