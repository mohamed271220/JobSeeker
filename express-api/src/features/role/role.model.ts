import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import User from "../auth/models/user.model";
import UserRole from "../auth/models/user-role.model";

@Table({
  tableName: "Roles",
  timestamps: false, // No createdAt or updatedAt fields in this table
})
class Role extends Model {
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

  @BelongsToMany(() => User, () => UserRole)
  declare userRoles: UserRole[];
}

export default Role;
