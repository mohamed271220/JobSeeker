import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "../../auth/models/user.model";

@Table({
  tableName: "Contacts",
  timestamps: true,
})
class Contact extends Model {
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
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare phone_number?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare address?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare linkedin_url?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare github_url?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare website_url?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: "created_at",
  })
  declare createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: "updated_at",
  })
  declare updatedAt?: Date;

  @BelongsTo(() => User, { foreignKey: "user_id", as: "user" })
  declare user: User;
}

export default Contact;
