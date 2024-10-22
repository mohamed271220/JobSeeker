import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/database";

class Testimonial extends Model {
  declare id: string;
  declare content: string; // The testimonial content
  declare author: string; // The name of the author
  declare givenBy: string; // FK to Profile who gave the testimonial
  declare receivedBy: string; // FK to Profile who received the testimonial
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    givenBy: {
      type: DataTypes.UUID,
      references: {
        model: "Profiles",
        key: "user_id",
      },
      allowNull: false,
    },
    receivedBy: {
      type: DataTypes.UUID,
      references: {
        model: "Profiles",
        key: "user_id",
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
    modelName: "Testimonial",
    tableName: "Testimonials",
    timestamps: true,
  }
);

export default Testimonial;
