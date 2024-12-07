import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import JobPostTag from "./job-post-tag.model";

@Table({
  tableName: "JobTags",
})
class JobTag extends Model {
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

  @HasMany(() => JobPostTag)
  declare jobPostTags: JobPostTag[];
}

export default JobTag;
