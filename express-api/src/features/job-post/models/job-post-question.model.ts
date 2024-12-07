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
import JobPost from "./job-post.model";
import ApplicationAnswer from "./job-application-answer.model";

@Table({
  tableName: "JobPostQuestions",
  timestamps: true,
})
class JobPostQuestion extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => JobPost)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare job_post_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare question: string;

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

  @BelongsTo(() => JobPost, { foreignKey: "job_post_id", as: "jobPost" })
  declare jobPost: JobPost;

  @HasMany(() => ApplicationAnswer, {
    foreignKey: "question_id",
    as: "answers",
  })
  declare answers: ApplicationAnswer[];
}

export default JobPostQuestion;
