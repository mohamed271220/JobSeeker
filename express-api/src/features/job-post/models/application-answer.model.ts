import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import sequelize from "../../../config/database";
import Application from "./application.model";
import JobPostQuestion from "./job-post-question.model";

@Table({
  tableName: "ApplicationAnswers",
  timestamps: true,
})
class ApplicationAnswer extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Application)
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

  @BelongsTo(() => Application, {
    foreignKey: "application_id",
    as: "application",
  })
  declare application: Application;

  @BelongsTo(() => JobPostQuestion, {
    foreignKey: "question_id",
    as: "question",
  })
  declare question: JobPostQuestion;
}

export default ApplicationAnswer;
