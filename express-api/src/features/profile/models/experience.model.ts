import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Profile from './profile.model';

@Table({
  tableName: 'Experiences',
  timestamps: true,
})
class Experience extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
 declare id: string;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
 declare user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare company: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare endDate: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  declare updatedAt: Date;

  @BelongsTo(() => Profile)
  declare profile: Profile;
}

export default Experience;