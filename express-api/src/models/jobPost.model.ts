import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import  sequelize  from '../config/database';
import Company from './company.model'; 
import Industry from './industry.model'; 
import JobPostSkill from './jobPostSkill.model'; 
import JobPostTag from './jobPostTag.model'; 
import Application from './application.model';
import JobPostQuestion from './jobPostQuestion.model';

class JobPost extends Model<
  InferAttributes<JobPost>,
  InferCreationAttributes<JobPost>
> {
  declare id: string;
  declare company_id: string;
  declare title: string;
  declare description: string;
  declare is_remote?: boolean;
  declare is_hybrid?: boolean;
  declare is_on_site?: boolean;
  declare industry_id?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

JobPost.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_remote: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_hybrid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_on_site: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    industry_id: {
      type: DataTypes.UUID,
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
    tableName: 'JobPosts',
    modelName: 'JobPost',
  }
);

// Associations
JobPost.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
JobPost.belongsTo(Industry, { foreignKey: 'industry_id', as: 'industry' });
JobPost.hasMany(JobPostSkill, { foreignKey: 'job_post_id', as: 'skills' });
JobPost.hasMany(JobPostTag, { foreignKey: 'job_post_id', as: 'tags' });
JobPost.hasMany(Application, { foreignKey: 'job_post_id', as: 'applications' });
JobPost.hasMany(JobPostQuestion, { foreignKey: 'job_post_id', as: 'questions' });

export default JobPost;
