import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import Profile from "./profile.model";

@Table({
  tableName: "Educations",
  timestamps: true,
})
class Education extends Model {
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
  declare institution: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare degree: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare field_of_study: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare end_date: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  @BelongsTo(() => Profile)
  declare profile: Profile;
}

export default Education;
