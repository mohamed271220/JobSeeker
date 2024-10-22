import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "../../../config/database";
import Role from "../../role/role.model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare first_name: string;
  declare last_name: string;
  declare role_id?: string; // Optional as it may be null
  declare profile_picture?: string; // Optional
  declare resume?: string; // Optional
  declare title?: string; // Optional
  declare bio?: string; // Optional
  declare resetPasswordToken: string | null;
  declare resetPasswordExpires: Date | null;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true, // This field can be null
      defaultValue: null,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true, // This field can be null
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

// Define associations

export default User;
