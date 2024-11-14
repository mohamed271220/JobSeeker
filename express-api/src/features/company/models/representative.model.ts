import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import Company from './company.model';
import User from '../../auth/models/user.model';

@Table({
  tableName: 'Representatives',
  timestamps: false, // No createdAt or updatedAt fields in this table
})
class Representative extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare user_id: string; // User ID as a foreign key

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare company_id: string; // Company ID as a foreign key
}

export default Representative;