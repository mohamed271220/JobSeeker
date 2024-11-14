import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Company from '../company/models/company.model';
import JobPost from '../job-post/models/job-post.model';

@Table({
  tableName: 'Industries',
  timestamps: false,
})
class Industry extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => Company, { foreignKey: 'industry_id', as: 'companies' })
  declare companies: Company[];

  @HasMany(() => JobPost, { foreignKey: 'industry_id', as: 'jobPosts' })
  declare jobPosts: JobPost[];
}

export default Industry;