import express from "express";
import dbConnection from "./config/database";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import compression from "compression";
import hpp from "hpp";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/error-handler";
import routes from "./routes";
import swaggerRouter from "./config/swagger";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "defaultSecretKey"],
    httpOnly: true, // Prevent client-side JS access to the cookie
    secure: process.env.NODE_ENV === "production", // HTTPS in production
    sameSite: "none", // Restrict cookies to the same site
  })
);
app.use(cookieParser());
app.use(compression()); // Compress responses
app.use(hpp()); // Protect against HTTP parameter pollution
app.use(xss()); // Prevent cross-site scripting attacks

// Security Headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);
app.use(helmet.xssFilter()); // X-XSS-Protection
app.use(helmet.noSniff()); // X-Content-Type-Options

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/v1", routes);

app.use(errorHandler);

// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

// Synchronize the database and start the server
dbConnection
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to synchronize the database:", error);
  });
