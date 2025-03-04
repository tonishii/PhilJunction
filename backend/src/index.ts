import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";
import mongoose, { connect, disconnect, model, MongooseOptions, Schema } from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

const databaseURL = "mongodb://localhost:27017/LR2TDB";
const mongoOptions: MongooseOptions = {};

interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

app.use("*", cors(corsOptions), (req, res, next) => next())

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverrrrr");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});