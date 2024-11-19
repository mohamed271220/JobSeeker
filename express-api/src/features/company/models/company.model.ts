import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "../../auth/models/user.model";
import Industry from "../../industry/industry.model";
import Representative from "./representative.model";
import JobPost from "../../job-post/models/job-post.model";
import Blog from "../../blog/models/blog-post.model";

@Table({
  tableName: "Companies",
  timestamps: true,
  paranoid: true,
})
class Company extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare owner_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @ForeignKey(() => Industry)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare industry_id?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profile_picture?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare website_url?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare phone_number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare address?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare established_date?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare company_size?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare mission_statement?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare facebook_url?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare linkedin_url?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare twitter_url?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare benefits?: string;

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

  @BelongsTo(() => User, { foreignKey: "owner_id", as: "owner" })
  declare owner: User;

  @BelongsTo(() => Industry, { foreignKey: "industry_id", as: "industry" })
  declare industry: Industry;

  @HasMany(() => Representative, {
    foreignKey: "company_id",
    as: "representatives",
  })
  declare representatives: Representative[];

  @HasMany(() => JobPost, { foreignKey: "company_id", as: "jobPosts" })
  declare jobPosts: JobPost[];

  @HasMany(() => Blog, { foreignKey: "company_id", as: "blogs" })
  declare blogs: Blog[];
}

export default Company;
