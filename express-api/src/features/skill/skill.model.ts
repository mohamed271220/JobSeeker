import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import JobPostSkill from '../job-post/models/job-post-skill.model';
import Profile from '../profile/models/profile.model';
import UserSkill from '../profile/models/user-skill.model';

@Table({
  tableName: 'Skills',
})
class Skill extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @HasMany(() => JobPostSkill)
  declare jobPostSkills: JobPostSkill[];

  @BelongsToMany(() => Profile, () => UserSkill)
  declare profiles: Profile[];
}

export default Skill;