import express from "express";
import dbConnection from "./config/database";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";

// Routes

import swaggerRouter from "./config/swagger";

dotenv.config();
import "./models"; // Import the models and relationships

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());

dbConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return dbConnection.sync(); // This will create the tables in your database
  })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes

app.use(errorHandler);

// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
