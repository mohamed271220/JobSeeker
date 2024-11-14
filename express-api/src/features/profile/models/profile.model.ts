import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import User from "../../auth/models/user.model";
import Experience from "./experience.model";
import Education from "./education.model";
import Project from "./project.model";
import UserSkill from "./user-skill.model";
import Testimonial from "./testimonial.model";

@Table({
  tableName: "Profiles",
  timestamps: true,
})
class Profile extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    onDelete: "CASCADE",
  })
  declare user_id: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: "created_at",
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: "updated_at",
  })
  declare updatedAt: Date;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Experience)
  declare experiences: Experience[];

  @HasMany(() => Education)
  declare educations: Education[];

  @HasMany(() => Project)
  declare projects: Project[];

  @HasMany(() => UserSkill)
  declare userSkills: UserSkill[];

  @HasMany(() => Testimonial)
  declare testimonials: Testimonial[];
}

export default Profile;
