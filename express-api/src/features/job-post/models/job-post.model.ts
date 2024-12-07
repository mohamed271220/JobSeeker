import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import sequelize from "../../../config/database";
import Company from "../../company/models/company.model";
import Industry from "../../industry/industry.model";
import JobPostSkill from "./job-post-skill.model";
import JobPostTag from "./job-post-tag.model";
import Application from "./job-application.model";
import JobPostQuestion from "./job-post-question.model";

@Table({
  tableName: "JobPosts",
  timestamps: true,
})
class JobPost extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare company_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare is_remote?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare is_hybrid?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare is_on_site?: boolean;

  @ForeignKey(() => Industry)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare industry_id?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare filled?: boolean;

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

  @BelongsTo(() => Company, { foreignKey: "company_id", as: "company" })
  declare company: Company;

  @BelongsTo(() => Industry, { foreignKey: "industry_id", as: "industry" })
  declare industry: Industry;

  @HasMany(() => JobPostSkill, { foreignKey: "job_post_id", as: "skills" })
  declare jobPostSkills: JobPostSkill[];

  @HasMany(() => JobPostTag, { foreignKey: "job_post_id", as: "tags" })
  declare jobPostTags: JobPostTag[];

  @HasMany(() => Application, { foreignKey: "job_post_id", as: "applications" })
  declare applications: Application[];

  @HasMany(() => JobPostQuestion, {
    foreignKey: "job_post_id",
    as: "questions",
  })
  declare jobPostQuestions: JobPostQuestion[];
}

export default JobPost;
