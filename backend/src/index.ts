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
const db = mongoose.connect(databaseURL);
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

app.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, confirmPW } = req.body;

  if (!username || !email || !password || !confirmPW)
    return res.status(400).json({ message: req.body });
  
  if(password !== confirmPW)
    return res.status(400).json({message: 'Passwords do not match.'});

  const user = await User.findOne({ username, email, password }).exec();
  if(user)
    return res.status(400).json({message: 'Account already exists.'});
  
  try {
    await User.create({...req.body})
    return res.status(201).json({ message: 'User registered successfully'});
  }
  catch (error: any) {
    console.error("Error during registration:", error);
    console.log(error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
}); 

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});