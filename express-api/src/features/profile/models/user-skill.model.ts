import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../../../config/database";

class UserSkill extends Model<
  InferAttributes<UserSkill>,
  InferCreationAttributes<UserSkill>
> {
  declare id: string;
  declare user_id: string;
  declare skill_id: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

UserSkill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "Profiles",
        key: "user_id",
      },
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.UUID,
      references: {
        model: "Skills",
        key: "id",
      },
      allowNull: false,
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
    modelName: "UserSkill",
    tableName: "UserSkills",
    timestamps: true,
  }
);

export default UserSkill;
