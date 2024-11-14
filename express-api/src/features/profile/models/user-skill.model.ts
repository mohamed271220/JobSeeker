import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Profile from "./profile.model";
import Skill from "../../skill/skill.model";
import User from "../../auth/models/user.model";

@Table({
  tableName: "UserSkills",
  timestamps: true,
})
class UserSkill extends Model {
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
  declare profile_id: string;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare skill_id: string;

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

  @BelongsTo(() => Profile, { foreignKey: "profile_id", as: "profile" })
  declare profile: Profile;

  @BelongsTo(() => Skill, { foreignKey: "skill_id", as: "skill" })
  declare skill: Skill;
}

export default UserSkill;
