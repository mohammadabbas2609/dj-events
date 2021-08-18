import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import UserRouter from "./routes/userRoutes.js";
import EventRouter from "./routes/eventRoutes.js";
import cookie from "cookie-parser";

const app = express();
dotenv.config({});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Accepting JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Setting up Cookie Parser
app.use(cookie());

// Managing Routes
app.use("/api/user", UserRouter);
app.use("/api/event", EventRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on Port ${PORT}`.green.bold);
});
