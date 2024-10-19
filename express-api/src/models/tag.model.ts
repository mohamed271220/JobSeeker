import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import  sequelize  from '../config/database';
import JobPostTag from './jobPostTag.model';

class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare id: string;
  declare name: string;
}

Tag.init(
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
    tableName: 'Tags',
    modelName: 'Tag',
  }
);

// Associations

export default Tag;
