import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import JobApplication from "./job-application.model";
import JobPostQuestion from "./job-post-question.model";

@Table({
  tableName: "JobApplicationAnswers",
  timestamps: true,
})
class JobApplicationAnswer extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => JobApplication)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare application_id: string;

  @ForeignKey(() => JobPostQuestion)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare question_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare answer: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt?: Date;

  @BelongsTo(() => JobApplication, {
    foreignKey: "application_id",
    as: "application",
  })
  declare application: JobApplication;

  @BelongsTo(() => JobPostQuestion, {
    foreignKey: "question_id",
    as: "question",
  })
  declare question: JobPostQuestion;
}

export default JobApplicationAnswer;
