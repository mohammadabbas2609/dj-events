import express from "express";
import dotenv from "dotenv";
import colors from "colors";

const app = express();
dotenv.config({});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`.green.bold);
});
