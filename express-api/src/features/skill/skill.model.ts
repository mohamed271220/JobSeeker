import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../config/database";
import JobPostSkill from "../job-post/models/job-post-skill.model";
import Profile from "../profile/models/profile.model";
import UserSkill from "../profile/models/user-skill.model";

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
