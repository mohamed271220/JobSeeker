import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "../../../auth/models/user.model";

@Table({
  tableName: "CompanyRequests",
  timestamps: true,
})
class CompanyRequest extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare user_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare industry_id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profile_picture?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare website_url?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone_number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare established_date?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare company_size?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare mission_statement?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt?: Date;

  @BelongsTo(() => User, { foreignKey: "user_id", as: "user" })
  declare user: User;
}

export default CompanyRequest;
