import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import JobPost from "./job-post.model";
import Tag from "../../JobTag/tag.model";

@Table({
  tableName: "JobPostTags",
})
class JobPostTag extends Model {
  @ForeignKey(() => JobPost)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare job_post_id: string;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  declare tag_id: string;

  @BelongsTo(() => JobPost, { foreignKey: "job_post_id", as: "jobPost" })
  declare jobPost: JobPost;

  @BelongsTo(() => Tag, { foreignKey: "tag_id", as: "tag" })
  declare tag: Tag;
}

export default JobPostTag;
