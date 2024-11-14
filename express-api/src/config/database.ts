import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { models } from "./models";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = (process.env.DB_PWD + "") as string;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = parseInt(process.env.DB_PORT as string) || 5432;

const dbConnection = new Sequelize({
  database: dbName,
  dialect: "postgres",
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  models: [...models],
});

export default dbConnection;
