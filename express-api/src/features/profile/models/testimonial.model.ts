import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Profile from './profile.model';

@Table({
  tableName: 'Testimonials',
  timestamps: true,
})
class Testimonial extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare author: string;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare givenBy: string;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare receivedBy: string;

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

  @BelongsTo(() => Profile, 'givenBy')
  declare  givenByProfile: Profile;

  @BelongsTo(() => Profile, 'receivedBy')
  declare receivedByProfile: Profile;
}

export default Testimonial;