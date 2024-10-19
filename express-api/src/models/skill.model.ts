import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";
import JobPostSkill from "./jobPostSkill.model";
import UserProfile from "./userProfile.model";
import UserSkill from "./userSkill.model";

class Skill extends Model<
  InferAttributes<Skill>,
  InferCreationAttributes<Skill>
> {
  declare id: string;
  declare name: string;
}

Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Skills",
    modelName: "Skill",
  }
);

// Associations


export default Skill;
