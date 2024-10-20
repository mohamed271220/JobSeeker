import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../../config/database";

class JobPostSkill extends Model<
  InferAttributes<JobPostSkill>,
  InferCreationAttributes<JobPostSkill>
> {
  declare job_post_id: string;
  declare skill_id: string;
}

JobPostSkill.init(
  {
    job_post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    skill_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "JobPostSkills",
    modelName: "JobPostSkill",
  }
);

export default JobPostSkill;
