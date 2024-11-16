import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";
import Role from "../../role/role.model";

@Table({
  tableName: "UserRoles",
  timestamps: false,
})
class UserRole extends Model {
  [x: string]: any;
  @ForeignKey(() => User)
  @Column({
    type: "UUID",
    allowNull: false,
    onDelete: "CASCADE",
  })
  declare user_id: string;

  @ForeignKey(() => Role)
  @Column({
    type: "UUID",
    allowNull: false,
    onDelete: "CASCADE",
  })
  declare role_id: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Role)
  declare role: Role;
}

export default UserRole;
