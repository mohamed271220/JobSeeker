import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import JobPostTag from "../job-post/models/job-post-tag.model";

@Table({
  tableName: "Tags",
})
class Tag extends Model {
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

export default Tag;
