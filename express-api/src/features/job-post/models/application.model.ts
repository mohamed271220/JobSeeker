import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import JobPost from "./job-post.model";
import User from "../../auth/models/user.model";
import ApplicationAnswer from "./application-answer.model";

@Table({
  tableName: "Applications",
  timestamps: true,
})
class Application extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare user_id: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare submitted_at: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare reviewed: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare feedback?: string;

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

  @BelongsTo(() => User, { foreignKey: "user_id", as: "user" })
  declare user: User;

  @HasMany(() => ApplicationAnswer, {
    foreignKey: "application_id",
    as: "answers",
  })
  declare answers: ApplicationAnswer[];
}

export default Application;
