import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
  BelongsToMany,
  ForeignKey,
} from "sequelize-typescript";
import Role from "../../role/role.model";
import Profile from "../../profile/models/profile.model";
import Representative from "../../company/models/representative.model";
import Application from "../../job-post/models/application.model";
import UserRole from "./user-role.model";
import Contact from "../../profile/models/contact-info.model";
import Company from "../../company/models/company.model";
import CompanyRequest from "../../company/models/company-request.model";
import UserSkill from "../../profile/models/user-skill.model";

@Table({
  tableName: "Users",
  timestamps: true,
})
class User extends Model {
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
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasOne(() => Profile)
  declare profile: Profile;

  @HasMany(() => Representative)
  declare representatives: Representative[];

  @HasMany(() => Application)
  declare applications: Application[];

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];

  @HasOne(() => Contact)
  declare contact: Contact;

  @HasMany(() => Company)
  declare companies: Company[];

  @HasMany(() => CompanyRequest)
  declare companyRequests: CompanyRequest[];
}

export default User;
