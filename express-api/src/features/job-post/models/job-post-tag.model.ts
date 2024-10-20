import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../../config/database";


class JobPostTag extends Model<
  InferAttributes<JobPostTag>,
  InferCreationAttributes<JobPostTag>
> {
  declare job_post_id: string;
  declare tag_id: string;
}

JobPostTag.init(
  {
    job_post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "JobPostTags",
    modelName: "JobPostTag",
  }
);

// Associations

export default JobPostTag;
