import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./corsOptions";
import mongoose, { connect, disconnect, model, MongooseOptions, Schema } from "mongoose";
const User = require('./models/user');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

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

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverrrrr");
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;
  
}); 

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});