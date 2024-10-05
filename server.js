import express from "express";
import colors from "colors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import { mongoDbConnection } from "./src/config/db.js";
import router from "./src/routes/api.js";
import {
  defaultErrorHandler,
  notFoundError,
} from "./src/utilis/errorHandler.js";

// express init
const app = express();
dotEnv.config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(hpp());

const limit = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limit);

//exvironments
const PORT = process.env.PORT || 6060;

// static folder
app.use(express.static("uploads"));

// routes
app.use("/api/v1", router);

// notfound error handler
app.use(notFoundError);

// default error handler
app.use(defaultErrorHandler);

// app listen
app.listen(PORT, () => {
  mongoDbConnection();
  console.log(`server is running on ${PORT}`.bgYellow.bold);
});
