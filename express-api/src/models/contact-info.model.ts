import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
  } from "sequelize";
  import sequelize from "../config/database";
  
  class Contact extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>> {
    declare id: string;
    declare userId: string; // Foreign key linking to User
    declare phone_number?: string; // Optional
    declare address?: string; // Optional
    declare linkedin_url?: string; // Optional
    declare github_url?: string; // Optional
    declare website_url?: string; // Optional
  }
  
  // Initialize the Contact model
  Contact.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // Name of the User table
          key: "id",
        },
      },
      phone_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      linkedin_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      github_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      website_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Contact",
      tableName: "Contacts",
      timestamps: true,
    }
  );
  
  export default Contact;
  