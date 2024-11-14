import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import JobPost from "./job-post.model";
import Skill from "../../skill/skill.model";

@Table({
  tableName: "JobPostSkills",
})
class JobPostSkill extends Model {
  @ForeignKey(() => JobPost)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare job_post_id: string;

  @ForeignKey(() => Skill)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare skill_id: string;

  @BelongsTo(() => JobPost, { foreignKey: "job_post_id", as: "jobPost" })
  declare jobPost: JobPost;

  @BelongsTo(() => Skill, { foreignKey: "skill_id", as: "skill" })
  declare skill: Skill;
}

export default JobPostSkill;
